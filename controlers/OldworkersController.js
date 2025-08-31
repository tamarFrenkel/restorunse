let workers = [
    {id: 1, name: "hari", role: "maneger", salary: 52596},
    {id: 2, name: "yoel", role: "clerk", salary: 34568 },
    {id: 3, name: "lea", role: "clerk", salary: 36528},
    {id: 4, name: "nachum", role: "clerk", salary: 19546}
]


const getAllWorkers = (req,res)=>{
    res.status(200).send(workers);
}

const getWorkersById = (req,res)=>{
    const workerId = req.params.id;
    const foundWorker = workers.find(u => u.id == workerId);

    if(foundWorker){
        res.status(200).send({"I find >_<":foundWorker});
    }
    else
       res.status(404).send('this worker is not exsit')
}

const deletedWorker = (req,res)=>{
    const id = req.params.id;
    console.log('id =>' ,id);
    
    workers = workers.filter(w=>w.id!=id);
    res.status(202).send(workers);
}

const AddWorker =  (req,res)=>{
    const newWorker = req.body;
    newWorker.id = workers.length + 1;

    workers.push(newWorker);
    res.status(201).send({'welcome >_<' : newWorker, 'all workers: ':workers})
}

const updateWorker = (req,res)=>{
    const id = req.params.id;
    const index = workers.findIndex(w=>w.id == id);
    
    if(index != -1){
        workers[index] = {...workers[index],
                            name: req.body.name,
                            role: req.body.role,
                            salary: req.body.salary};
        res.status(201).send({" update workers: ": workers[index]})
    }
    else{
        res.status(404).send('worker not found');
    }
    
}























module.exports = {
    getAllWorkers,
    getWorkersById,
    deletedWorker,
    AddWorker,
    updateWorker
}