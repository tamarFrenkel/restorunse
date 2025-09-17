const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// קבלת כל המוצרים
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "שגיאה בשליפת מוצרים" });
  }
});

// הוספת מוצר חדש
router.post("/", async (req, res) => {
  try {
    const { name, title, price, img } = req.body;
    const newProduct = new Product({ name, title, price, img });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: "שגיאה בהוספת מוצר" });
  }
});

module.exports = router;
