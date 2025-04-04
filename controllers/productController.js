const productModel = require("../models/productModel");

// Fetch all products
const getAllProducts = (req, res) => {
  productModel.getProducts((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(results);
  });
};

// Fetch a single product by ID
const getProduct = (req, res) => {
  const { id } = req.params;
  productModel.getProductById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(results[0]);
  });
};

// Add a new product
// const createProduct = (req, res) => {
//   productModel.addProduct(req.body, (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to add product" });
//     }
//     res.status(201).json({ message: "Product added successfully", id: results.insertId });
//   });
// };

const createProduct = (req, res) => {
  const product = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    //image: req.body.image || null
  };
  productModel.addProduct(product, (err, results) => {
    console.log("err",err);
    
    if (err) {
      return res.status(500).json({ error: "Failed to add product" });
    }
    res.status(201).json({
      message: "Product added successfully", 
      id: results.insertId
    });
  });
};

// Update a product
// const updateProduct = (req, res) => {
//   const { id } = req.params;
//   productModel.updateProduct(id, req.body, (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to update product" });
//     }
//     res.status(200).json({ message: "Product updated successfully" });
//   });
// };

const updateProduct = (req, res) => {
  const { id } = req.params;
  const product = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image || null
  };

  productModel.updateProduct(id, product, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update product" });
    }
    res.status(200).json({ 
      message: "Product updated successfully"
    });
  });
};

// Delete a product
const deleteProduct = (req, res) => {
  const { id } = req.params;
  productModel.deleteProduct(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete product" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  });
};

module.exports = { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct };
