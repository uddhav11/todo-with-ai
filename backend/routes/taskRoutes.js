import express from 'express'
const router = express.Router();
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import authMiddleware from '../utils/authMiddleware.js';

router.post('/create', authMiddleware, createTask);
router.get('/gettasks', authMiddleware, getTasks);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router;

