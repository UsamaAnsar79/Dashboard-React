const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Fetch all users
router.get("/users", getAllUsers);

// Create a new user
router.post("/addUser", createUser);

// Fetch a single user by ID
router.get("/viewUser/:id", getUserById);

// Update user by ID
router.put("/updateUser/:id", updateUser);

// Delete a user by ID
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
