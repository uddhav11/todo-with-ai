import Task from '../models/Task.js';

export const createTask= async (req, res) => {
    try {
        const {title, description, deadline, priority} = req.body;
        const tasks = new Task({
            title,
            description,
            deadline,
            priority,
            userId: req.user.userId
        });

        await tasks.save();
        res.status(201).json({tasks});

    } catch (error) {
        console.log('this is error', error)
        res.status(500).json({error: error.message})
    }
}

export const getTasks= async (req, res) => {
    try {
        const tasks= await Task.find({userId: req.user.userId});
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


export const updateTask= async (req, res) => {
    try {
        const {id}= req.params;
        const task=await Task.findByIdAndUpdate(id, req.body, {name: true});
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const deleteTask= async (req, res) => {
    try {
        const {id}= req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json({message: 'Task deleted successfully'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}