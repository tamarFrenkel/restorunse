const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({

    // id נוצר אוטומטי

    worker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'worker'
        },

    name:{
        type:String,
        require:true
        //validation
    },
    price:{
        type:Number,
        require:true
    },
    qty:{
        type:Number,
        require:true
    },
    title:{
        type:String,
        require:false
    }

    
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;