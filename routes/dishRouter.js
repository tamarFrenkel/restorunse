const express = require('express');
const DishRouter = express.Router();
const DishesController = require('../controlers/DishesController');

DishRouter.get('/',DishesController.getAllDishes);
DishRouter.get('/:id', DishesController.getDishById);
DishRouter.delete('/:id', DishesController.deletedDish);
DishRouter.post('/', DishesController.AddDish);
DishRouter.put('/:id', DishesController.updateDish);

module.exports = DishRouter;