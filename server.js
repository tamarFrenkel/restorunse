require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
//אם המסד נתונים הזה קיים הוא יתחבר אליו,
//אם לא קיים הוא ייצר לי אותו
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connect to DB');
    app.listen(5000, () =>{
    console.log('server is running in port: ${process.env.PORT}');
    })
    })  
    .catch((err) => console.error('❌ MongoDB connection error:', err.message));

const workerRouter = require('./routes/workerRouter');
const dishRouter = require('./routes/dishRouter');
const taskRouter = require('./routes/taskRouter');

app.use(cors());
app.use(express.json());

app.use('/api/workers', workerRouter);
app.use('/api/dishes', dishRouter);
app.use('/api/tasks', taskRouter);
app.use('/images', express.static('public/images'));

