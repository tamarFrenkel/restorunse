const { urlencoded } = require('express');
const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    // id נוצר אוטומטי
    name:{
        type:String,
        required:true
        //validation
    },
    role:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    image:{
        type:String,
    }
    

});

const Worker = mongoose.model('Worker', workerSchema);
module.exports = Worker;