const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controlers/cartController');

cartRouter.get('/:userId', cartController.getCartByUser);
cartRouter.post('/:userId/add', cartController.addToCart);
cartRouter.post('/:userId/remove', cartController.removeFromCart);
cartRouter.put('/:userId/update', cartController.updateQuantity);

module.exports = cartRouter;
