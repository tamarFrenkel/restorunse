const express= require('express');
const app = express();

app.use(express.json());

let workers = [
    {id: 1, name: "hari", role: "maneger", salary: 52596},
    {id: 2, name: "yoel", role: "clerk", salary: 34568 },
    {id: 3, name: "lea", role: "clerk", salary: 36528},
    {id: 4, name: "nachum", role: "clerk", salary: 19546}
]

app.get('/', (req,res)=>{
    res.send('welcome to our site')
})

app.get('/workers',(req,res)=>{
    res.send(workers);
})

app.get('/workers/:id', (req,res)=>{
    const workerId = req.params.id;
    const foundWorker = workers.find(u => u.id == workerId);

    if(foundWorker){
        res.send({"I find >_<":foundWorker});
    }
    else
       res.send('this worker is not exsit')
})

// הוספת qvery שזה לא חובה להכניס נתון
// http://localhost:5000/workers/2?salary=14567
app.get('/workers/:id', (req,res)=>{
    const workerId = req.params.id;
    const selectedSalary = req.query.salary;
    const foundWorker = foundWorker.find(u => u.id == workerId);

    if(foundWorker){
        if(selectedSalary){
            if(selectedSalary < foundWorker.qty)
                res.send({message: 'hey ist too low, am i right?', foundWorker});
            else 
                res.send({message:'the salar is ok ', foundWorker} )
        }
        else
            res.send(foundWorker);
    }
    else
       res.send('this worker is not exsit')
})

app.delete('/workers/:id', (req,res)=>{
    const selectedId = req.params.id;
    const deletedWorker = workers.find(w=>w.id == selectedId);

    if (!deletedWorker) {
        return res.status(404).send({ message: 'Worker not found' });
    }

    workers = workers.filter(w=>w.id != selectedId);
    res.send({message: 'worker going home todey ', deletedWorker, arr:workers});

})

app.post('/workers', (req,res) => {

    const {name, role, salary} = req.body;

    if (!name || !role || !salary) {
        return res.status(400).send({ message: "All fields (name, role, salary) are required." });
    }

    const newWorker = {
        id: workers.length + 1,
        name,
        role,
        salary
    };
    console.log('new worker = ', newWorker);

    workers.push(newWorker);

    res.send({
        massage: 'hey new worker ^_^',
        Worker: newWorker
    })
    
})

const checkTime = (req,res,next)=>{

    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();

    if(hour >= 1 && minutes >= 45 && hour < 6 && minutes >=30){
        res.status(403).send("מאוחר לכי לישון!")
    }

    console.log([hour + ":" + minutes]);
    next();
}

const checkDay = (req,res,next)=>{

    const day = new Date().getDay();

    if(day == 3){
        res.send("שבת היום!!")
    }

    console.log(day);
    next();
}

const newM=(req,res,next)=>{
    console.log("level 2");
    req.abc = "my name";
    next();
}

app.use(checkTime);
app.use(newM);



//קביעת פורט שהשרת ירוץ בו
app.listen(5000, () =>{
    console.log('server is running in port: http://localhost:5000 ');
})

