const Cart = require('../modells/Cart');
const mongoose = require('mongoose');

const getCartByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    res.status(200).send(cart || { userId, items: [] });
  } catch (err) {
    res.status(400).send("error");
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(i => i.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId: mongoose.Types.ObjectId(productId), quantity });
    }
    await cart.save();
    const populated = await cart.populate('items.productId');
    res.status(200).send(populated);
  } catch (err) {
    res.status(400).send("some error: " + err.message);
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).send("cart not found");
    cart.items = cart.items.filter(i => i.productId.toString() !== productId);
    await cart.save();
    const populated = await cart.populate('items.productId');
    res.status(200).send(populated);
  } catch (err) {
    res.status(400).send("error");
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).send("cart not found");
    const item = cart.items.find(i => i.productId.toString() === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        cart.items = cart.items.filter(i => i.productId.toString() !== productId);
      }
      await cart.save();
      const populated = await cart.populate('items.productId');
      res.status(200).send(populated);
    } else {
      res.status(404).send("item not found");
    }
  } catch (err) {
    res.status(400).send("error during update");
  }
};

module.exports = {
  getCartByUser,
  addToCart,
  removeFromCart,
  updateQuantity
};
