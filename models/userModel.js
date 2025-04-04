const pool = require("../config/db");

// Get all users
const getUsers = (callback) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Get user by email
const getUserByEmail = (email, callback) => {
  pool.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return callback(err, null);
    
    // Ensure it always returns an array, even if empty
    callback(null, results.length > 0 ? results[0] : null);
  });
};


// Add a new user
const addUser = (user, callback) => {
  const { name, email, password, role } = user;
  pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

// Update a user
const updateUser = (id, user, callback) => {
  const { name, email, password, role } = user;
  pool.query(
    "UPDATE users SET name=?, email=?, password=?, role=? WHERE id=?",
    [name, email, password, role, id],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

// Delete a user
const deleteUser = (id, callback) => {
  pool.query("DELETE FROM users WHERE id=?", [id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

module.exports = { getUsers, getUserByEmail, addUser, updateUser, deleteUser };
