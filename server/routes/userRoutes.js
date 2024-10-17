
const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { body } = require('express-validator');

// Fetch all users
router.get("/users", getAllUsers);

// Create a new user with validation
router.post("/users", 
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  createUser
);

// Fetch a single user by ID
router.get("/users/:id", getUserById);

// Update user by ID
router.put("/users/:id", 
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  updateUser
);

// Delete a user by ID
router.delete("/users/:id", deleteUser);

module.exports = router;
