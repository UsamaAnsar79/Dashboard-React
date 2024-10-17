// controllers/userController.js
const UserModel = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  const { name, email, password, permissions, roles, status } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new UserModel({ name, email, password, permissions, roles, status });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate("roles");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  const { name, email, password, permissions, roles, status } = req.body;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name, email, password, permissions, roles, status },
      { new: true }
    ).populate("roles");

    if (updatedUser) {
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
