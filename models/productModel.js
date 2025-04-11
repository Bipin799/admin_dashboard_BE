const pool = require("../config/db");

const getProducts = async () => {
  const [rows] = await pool.query("SELECT * FROM products");
  return rows;
};

const getProductById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0]; // or return rows if you want full array
};

// const addProduct = async (product) => {
//   const { title, description, price, category } = product;
//   const [result] = await pool.query(
//     "INSERT INTO products (title, description, price, category) VALUES (?, ?, ?, ?)",
//     [title, description, price, category]
//   );
//   return result;
// };

const addProduct = async (product) => {
  const { title, description, price, category, image } = product;
  const [result] = await pool.query(
    "INSERT INTO products (title, description, price, category, image) VALUES (?, ?, ?, ?, ?)",
    [title, description, price, category, image || null]
  );
  return result;
};


const updateProduct = async (id, product) => {
  const { title, description, price, category, image } = product;
  const [result] = await pool.query(
    "UPDATE products SET title=?, description=?, price=?, category=?, image=? WHERE id=?",
    [title, description, price, category, image, id]
  );
  return result;
};

const deleteProduct = async (id) => {
  const [result] = await pool.query("DELETE FROM products WHERE id=?", [id]);
  return result;
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
