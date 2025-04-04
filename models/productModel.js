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
  console.log("product",product);
  
  const { title, description, price, category } = product;
  pool.query(
    "INSERT INTO products (id, title, description, price, category) VALUES (?, ?, ?, ?, ?)",
    [22,title, description, price, category ],
    callback
  );
};

// Update an existing product
const updateProduct = (id, product, callback) => {
  const { title, description, price, category, image } = product;
  pool.query(
    "UPDATE products SET title=?, description=?, price=?, category=?, image=? WHERE id=?",
    [title, description, price, category, image, id],
    callback
  );
};

// Delete a product
const deleteProduct = (id, callback) => {
  pool.query("DELETE FROM products WHERE id=?", [id], callback);
};

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };