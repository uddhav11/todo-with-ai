import express from 'express'
const router = express.Router();
import { getTasks, createTask, updateTask, deleteTask, getProductivityTips, getTip } from '../controllers/taskController.js';
import authMiddleware from '../utils/authMiddleware.js';

router.post('/create', authMiddleware, createTask);
router.get('/gettasks', authMiddleware, getTasks);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);
router.get('/tips', authMiddleware, getProductivityTips)
router.get('/tip/:id', authMiddleware, getTip)

export default router;

