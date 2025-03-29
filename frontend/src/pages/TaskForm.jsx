import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask, clearSelectedTasks, fetchTasks } from "../redux/taskSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskForm = () => {
  const dispatch = useDispatch();
  const { selectedTask } = useSelector((state) => state.tasks);
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: new Date(),
    priority: "medium",
  });

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title,
        description: selectedTask.description,
        deadline: new Date(selectedTask.deadline),
        priority: selectedTask.priority,
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      deadline: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;
    try {
      const taskData= {
        ...formData,
        deadline: formData.deadline.toISOString()
      };

      if (selectedTask) {
        await dispatch(updateTask({
          id: selectedTask._id,
          taskData
        })).unwrap();
      } else{
        await dispatch(createTask(taskData)).unwrap()
        await dispatch(fetchTasks())
      }

      setFormData({
        title: "",
        description: "",
        deadline: new Date(),
        priority: "medium",
      });
      if(selectedTask){
        dispatch(clearSelectedTasks())
      }
    } catch (error) {
      console.log('Task operation failed;', error)
    }

    // if (selectedTask) {
    //   dispatch(updateTask({ id: selectedTask._id, taskData: formData }));
    // } else {
    //   dispatch(createTask(formData));
    // }
  };

  const handleCancel = () => {
    dispatch(clearSelectedTasks());
    setFormData({
      title: "",
      description: "",
      deadline: new Date(),
      priority: "medium",
    });
  };

  return (
    <div className="bg-white py-6 md:p-6 rounded-lg shadow-md mb-8">
      <h1 className="text-xl font-semibold mb-4">
        {selectedTask ? "Edit Task" : "Create New Task"}
      </h1>
      <form onSubmit={handleSubmit} className="text-black ">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full md:w-[70%] p-2 border rounded-2xl border-gray-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-2xl border-gray-500"
            rows="5"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Deadline</label>
          <DatePicker
            selected={formData.deadline}
            onChange={handleDateChange}
            className="w-full p-2 border rounded-2xl text-center"
            minDate={new Date()}
            required
          />
        </div>
        <div className="mb-4 mx-auto w-[70%]">
          <label className="block text-gray-700 mb-2">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-[70%] p-2 border rounded-2xl text-center"
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>

        <div className="flex space-x-4 items-center justify-center">
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-xl bg-blue-500 hover:bg-blue-700 font-bold"
          >
            {selectedTask ? "Update Task" : "Create Task"}
          </button>
          {selectedTask && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2  bg-gray-500 text-white rounded-xl hover:bg-gray-600 font-bold"
          >
            Cancel
          </button>
        )}
        </div>
        
      </form>
    </div>
  );
};

export default TaskForm;
