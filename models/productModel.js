const pool = require("../config/db");

// Fetch all products
const getProducts = (callback) => {
  pool.query("SELECT * FROM products", callback);
};

// Fetch a single product by ID
const getProductById = (id, callback) => {
  pool.query("SELECT * FROM products WHERE id = ?", [id], callback);
};

// Add a new product
const addProduct = (product, callback) => {
  const { name, price, description, stock } = product;
  pool.query(
    "INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)",
    [name, price, description, stock],
    callback
  );
};

// Update an existing product
const updateProduct = (id, product, callback) => {
  const { name, price, description, stock } = product;
  pool.query(
    "UPDATE products SET name=?, price=?, description=?, stock=? WHERE id=?",
    [name, price, description, stock, id],
    callback
  );
};

// Delete a product
const deleteProduct = (id, callback) => {
  pool.query("DELETE FROM products WHERE id=?", [id], callback);
};

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };