const Worker = require('../modells/workerModel');

const addNewWorker = async (req, res) => {
  try {
    const imageUrl = req.file ? `/images/${req.file.filename}` : null;
    const newWorker = new Worker({ ...req.body, image: imageUrl });
    await newWorker.save();
    res.status(200).send({ message: "worker added >_<", worker: newWorker });
  } catch (err) {
    res.status(400).send("some error: " + err.message);
  }
};

const getAllWorkers = async (req, res) => {
  try {
    const allWorkers = await Worker.find();
    res.status(200).send(allWorkers);
  } catch (err) {
    res.status(400).send("error");
  }
};

const getWorkersById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundWorker = await Worker.findById(id);
    if (foundWorker)
      res.status(200).send(foundWorker);
    else
      res.status(404).send("not found");
  } catch (err) {
    res.status(400).send("error");
  }
};

const deletedWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWorker = await Worker.findByIdAndDelete(id);
    if (deletedWorker)
      res.status(200).send({ message: "success", worker: deletedWorker });
    else
      res.status(404).send("worker not found");
  } catch (err) {
    res.status(400).send("error");
  }
};

const updateWorker = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedData = {
      name: req.body.name,
      role: req.body.role,
      salary: req.body.salary,
      age: req.body.age
    };

    if (req.file) {
      updatedData.image = `/images/${req.file.filename}`;
    }

    const updatedWorker = await Worker.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

    if (updatedWorker)
      res.status(200).send({ message: "updated successfully", worker: updatedWorker });
    else
      res.status(404).send("worker not found");
  } catch (err) {
    console.error(err);
    res.status(400).send("error during update");
  }
};

module.exports = {
  addNewWorker,
  getAllWorkers,
  getWorkersById,
  deletedWorker,
  updateWorker
};


// const Worker = require('../modells/workerModel');

// //הוספת משימה
// const addNewWorker = async(req,res)=> {
//     try{
//         const imageUrl = req.file ? `/images/${req.file.filename}` : null;
//         const newWorker = new Worker({ ...req.body, image: imageUrl });
//         await newWorker.save();
//         res.status(200).send({massage:"woreker added >_<", worker:newWorker})
//     } catch(err){
//         res.status(400).send("some error" + err.message);
//     }
// }

// const getAllWorkers = async(req,res)=>{
//     try{
//         const allWorkers = await Worker.find();
//         // .populate('workerID')
//         res.status(200).send(allWorkers);

//     }catch(err){
//         res.status(400).send("error");
//     }
// }

// const getWorkersById = async(req,res)=>{
//     try{
//         const {id} = req.params;
//         const foundWorker = await Worker.find({_id:id});
//         if(foundWorker)
//         res.status(200).send(foundWorker);
//         else
//         res.status(404).send("not faund");
//     }catch(err){
//         res.status(400).send("error");
//     }
// }

// const deletedWorker = async(req,res)=>{
//     try{
//         const {id} = req.params;
//         const deleteWorker = await Worker.findByIdAndDelete(id);
//         if(deleteWorker)
//             res.status(200).send({massage: "secssed", Worker: deleteWorker})
//         else
//             res.status(404).send("worker not found");
//     }
//     catch(err){
//         res.status(400).send("error");
//     }
// }

// const updateWorker = async(req,res)=>{
//     try{
//         const {id} = req.params;
//         const updatedWorker = await Worker.findByIdAndUpdate(id, {$set:req.body}, {new:true});

//         if(updatedWorker)
//             res.status(200).send({massage: "secssed", Worker: updatedWorker})
//         else
//             res.status(404).send("worker not found");
//     }catch(err){
//             res.status(400).send("error");
//     }
// }


// module.exports = {
//     addNewWorker,
//     getAllWorkers,
//     getWorkersById,
//     deletedWorker,
//     updateWorker
// }