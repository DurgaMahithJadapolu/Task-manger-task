const express = require('express');
const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} = require('../Controllers/TaskController');

const router = express.Router();

// Routes
router.post('/tasks', createTask);          // Create task
router.get('/tasks', getTasks);            // Get all tasks
router.patch('/tasks/:id', updateTaskStatus); // Update task status
router.delete('/tasks/:id', deleteTask);   // Delete task

module.exports = router;
