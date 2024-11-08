const express = require('express');
const TaskController = require('../controllers/task_controller');
const taskRoutes = express.Router();

taskRoutes.get('/', TaskController.getTasks);

taskRoutes.get('/task/:id', TaskController.getTaskDetail);

module.exports = taskRoutes;