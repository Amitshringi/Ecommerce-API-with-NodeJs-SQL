// Importing necessary modules
const express = require('express');
const authController = require('../controllers/authController');

// Creating a new router instance
const router = express.Router();

// Route for user registration
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

// Exporting the router to make it accessible from other files
module.exports = router;
