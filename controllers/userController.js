
const User = require("../models/userModel");

// Get all users
const getAllUsers = (req, res) => {
  User.getUsers((err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
};

// Login user
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  User.getUserByEmail(email, (err, user) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Validate password
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ message: "Login successful", user });
  });
};


// Add a new user
const createUser = (req, res) => {
  User.addUser(req.body, (err, result) => {
    if (err) {
      console.error("Error adding user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(201).json({ message: "User added successfully" });
  });
};

// Update user
const updateUser = (req, res) => {
  User.updateUser(req.params.id, req.body, (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "User updated successfully" });
  });
};

// Delete user
const deleteUser = (req, res) => {
  User.deleteUser(req.params.id, (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "User deleted successfully" });
  });
};

module.exports = { getAllUsers, loginUser, createUser, updateUser, deleteUser };
