const Product = require('../modells/Product');

const addNewProduct = async (req, res) => {
  try {
    const { name, title, price, img } = req.body;
    const newProduct = new Product({ name, title, price, img });
    await newProduct.save();
    res.status(200).send({ message: "product added >_<", product: newProduct });
  } catch (err) {
    res.status(400).send("some error: " + err.message);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).send(allProducts);
  } catch (err) {
    res.status(400).send("error");
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    if (foundProduct)
      res.status(200).send(foundProduct);
    else
      res.status(404).send("not found");
  } catch (err) {
    res.status(400).send("error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct)
      res.status(200).send({ message: "success", product: deletedProduct });
    else
      res.status(404).send("product not found");
  } catch (err) {
    res.status(400).send("error");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = {
      name: req.body.name,
      title: req.body.title,
      price: req.body.price,
      img: req.body.img
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

    if (updatedProduct)
      res.status(200).send({ message: "updated successfully", product: updatedProduct });
    else
      res.status(404).send("product not found");
  } catch (err) {
    console.error(err);
    res.status(400).send("error during update");
  }
};

module.exports = {
  addNewProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct
};
