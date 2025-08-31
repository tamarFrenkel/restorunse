const Task = require('../modells/taskModel');

const craetTask = async(req, res)=>{
    const task = new Task (req.body);
    await task.save();
    res.json(task);
}

const getAllTasks = async(req,res)=>{
    const tasks = await Task.find().populate('worker');
    res.json(tasks);
}

module.exports = {
    craetTask,
    getAllTasks
}