const express = require('express');
const workerRouter = express.Router();
const multer = require('multer'); 
const path = require('path');     

const workersController = require('../controlers/workersController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


workerRouter.get('/', workersController.getAllWorkers);
workerRouter.get('/:id', workersController.getWorkersById);
workerRouter.delete('/:id', workersController.deletedWorker);
workerRouter.post('/', upload.single('image'), workersController.addNewWorker);
workerRouter.put('/:id', upload.single('image'), workersController.updateWorker);

module.exports = workerRouter;