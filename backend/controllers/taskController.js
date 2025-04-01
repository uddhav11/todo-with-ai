import Task from "../models/Task.js";
import {
  generateAiSuggestion,
  autoCategorize,
  generateDescription,
  generateAiSuggestionForParticularTask,
} from "../services/openAiService.js";

const emitTaskUpdate = (req, task, action) => {
  const io = req.app.get("io");
  io.to(`user_${task.userId}`).emit("taskUpdate", {
    task,
    action,
    timestamp: new Date(),
  });
};

export const createTask = async (req, res) => {
  try {
    const { title, description, deadline, priority } = req.body;
    const [category, enhanceDescription] = await Promise.all([
      autoCategorize(title, description),
      description ? description : generateDescription(title),
    ]);

    const tasks = new Task({
      title,
      description: description || enhanceDescription,
      deadline,
      priority,
      category: category,
      userId: req.user.userId,
    });

    await tasks.save();
    emitTaskUpdate(req, tasks, "created");
    res.status(201).json({ tasks });
  } catch (error) {
    console.log("error in create task", error);
    res.status(500).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    const suggestions = await generateAiSuggestion(tasks);
    console.log("this is taskSlice controller", tasks);

    res.status(200).json({ tasks });
  } catch (error) {
    console.log("this is error: ", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, deadline, priority } = req.body;

    await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        deadline,
        priority,
      },
      { new: true }
    );

    const updateTask = await Task.findById(id);

    if (!updateTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    emitTaskUpdate(req, updateTask, "updated");
    res.status(200).json({ task: updateTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    emitTaskUpdate(req, task, "deleted");
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductivityTips = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    const suggestion = await generateAiSuggestion(tasks);

    res.status(200).json({ suggestion });
  } catch (error) {
    console.log("error in get productivity tips", error);
    res.status(500).json({ error: "Failed to generate tips" });
  }
};

export const getTip = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    const suggestion =await generateAiSuggestionForParticularTask({
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      priority: task.priority,
  });
  console.log('this is suggestion from generateAiSuggestionForParticularTask: ', suggestion)
    res.status(200).json({suggestion})
  } catch (error) {
    console.log("this is getTip error: ", error);
    return res.status(500).json({ message: "error in getTip" });
  }
};


