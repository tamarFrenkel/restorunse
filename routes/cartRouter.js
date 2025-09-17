import express from "express";
import Cart from "../models/Cart.js";
const router = express.Router();

router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
  res.json(cart || { userId: req.params.userId, items: [] });
});


router.post("/:userId/add", async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.params.userId });
  if (!cart) {
    cart = new Cart({ userId: req.params.userId, items: [] });
  }
  const item = cart.items.find(i => i.productId.toString() === productId);
  if (item) {
    item.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }
  await cart.save();
  res.json(cart);
});

router.post("/:userId/remove", async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ userId: req.params.userId });
  if (!cart) return res.json({ message: "Cart not found" });
  cart.items = cart.items.filter(i => i.productId.toString() !== productId);
  await cart.save();
  res.json(cart);
});

export default router;
