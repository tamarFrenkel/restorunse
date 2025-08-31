const express = require('express');
const taskRouter = express.Router();
const taskController = require('../controlers/taskController');

taskRouter.get('/',taskController.getAllTasks);
taskRouter.post('/',taskController.craetTask);

module.exports = taskRouter;