const productModel = require("../models/productModel");

// Fetch all products
const getAllProducts = async (req, res) => {
  try {
    const results = await productModel.getProducts();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Database query failed" });
  }
};

// Fetch a single product by ID
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productModel.getProductById(id);
    if (!result) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Database query failed" });
  }
};

// Add a new product
const createProduct = async (req, res) => {
  const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

  const product = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image
  };
try {
    const result = await productModel.addProduct(product);

    res.status(201).json({
      message: "Product added successfully",
      id: result.insertId,
      ...product // ✅ send back the full product with image
    });
  } catch (err) {
    console.error("Failed to add product:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  const imagePath = req.file ? req.file.filename : req.body.existingImage || null;

  const product = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: imagePath
  };

  try {
    await productModel.updateProduct(id, product);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productModel.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
