const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String },
  price: { type: Number, required: true },
  img: { type: String }
});

module.exports = mongoose.model("Product", productSchema);
