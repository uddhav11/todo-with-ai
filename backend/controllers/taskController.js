import Task from '../models/Task.js';

const emitTaskUpdate= (req, task, action) => {
    const io= req.app.get('io')
    io.to(`task_${task._id}`).emit('taskUpdate', {task,action})
}

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
        emitTaskUpdate(req, tasks, 'created')
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
        const {title, description, deadline, priority} = req.body;

        await Task.findByIdAndUpdate(id, {
            title, 
            description,
            deadline,
            priority
        }, {new: true})     
        
        const updateTask= await Task.findById(id)

        if(!updateTask){
            return res.status(404).json({error: 'Task not found'})
        }
        emitTaskUpdate(req, updateTask,'updated')
        res.status(200).json({task: updateTask})
    } catch (error) {
        res.status(500).json({error: error.message})
    }

    
}

export const deleteTask= async (req, res) => {
    try {
        const {id}= req.params;
        
        const task= await Task.findByIdAndDelete(id);
        emitTaskUpdate(req, task, 'deleted');
        res.status(200).json({message: 'Task deleted successfully'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}