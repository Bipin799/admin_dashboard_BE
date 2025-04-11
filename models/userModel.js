const pool = require("../config/db");
const bcrypt = require("bcrypt");

// Get all users
const getUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

// Get user by email
const getUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows.length > 0 ? rows[0] : null;
};

// Add a new user
const addUser = async (user) => {
  const { name, email, password, role } = user;
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role]
  );
  return result;
};

// Update a user
const updateUser = async (id, user) => {
  const { name, email, password, role } = user;
  const [result] = await pool.query(
    "UPDATE users SET name=?, email=?, password=?, role=? WHERE id=?",
    [name, email, password, role, id]
  );
  return result;
};

// Delete a user
const deleteUser = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE id=?", [id]);
  return result;
};

const resetUserPassword = async (token, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const [result] = await pool.query(
    "UPDATE users SET password = ?, reset_token = NULL WHERE reset_token = ?",
    [hashedPassword, token]
  );

  return result;
};

module.exports = { getUsers, getUserByEmail, addUser, updateUser, deleteUser, resetUserPassword };
