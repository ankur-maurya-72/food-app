import express from 'express'
import { creatTodo, deleteTodo, getTodos, updateTodo } from '../controller/todo.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router()
router.post('/create', isAuthenticated, creatTodo)
router.get('/fetch', isAuthenticated, getTodos)
router.put('/update/:id', isAuthenticated, updateTodo)
router.delete('/delete/:id', isAuthenticated, deleteTodo)

export default router;