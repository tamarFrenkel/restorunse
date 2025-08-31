const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    done: Boolean,
    worker:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'worker'
    }
});

module.exports = mongoose.model('Task', taskSchema);