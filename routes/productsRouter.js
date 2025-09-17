const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controlers/productsController');

productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:id', productsController.getProductById);
productsRouter.delete('/:id', productsController.deleteProduct);
productsRouter.post('/', productsController.addNewProduct);
productsRouter.put('/:id', productsController.updateProduct);

module.exports = productsRouter;
