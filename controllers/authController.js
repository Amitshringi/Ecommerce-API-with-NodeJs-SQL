const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/database');
const authService = require('../services/authService');
const { ErrorHandler } = require('../utils/errorHandler');

// Register a new user
const register = async (req, res, next) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // SQL query to insert user into the database
    const query = 'INSERT INTO user (username, password) VALUES (?, ?)';
    // Execute the query
    connection.query(query, [username, hashedPassword], (error, results) => {
      if (error) {
        // Handle database error
        return next(new ErrorHandler(500, 'Failed to register user'));
      }
      // Check if user was successfully registered
      if (results.affectedRows === 1) {
        // Send success response
        res.status(201).json({ message: 'User registered successfully' });
      } else {
        // If no rows were affected, it means the user was not inserted
        return next(new ErrorHandler(500, 'Failed to register user'));
      }
    });
  } catch (error) {
    // Forward error to error handling middleware
    next(error);
  }
};

// Authenticate user and generate JWT token
const login = async (req, res, next) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;
    // SQL query to fetch user from database based on username
    const query = 'SELECT * FROM user WHERE username = ?';
    // Execute the query
    connection.query(query, [username], async (error, results) => {
      if (error) {
        // Handle database error
        return next(new ErrorHandler(500, 'Failed to authenticate user'));
      }
      // Check if user exists
      if (results.length === 0) {
        // If no user found, send error response
        return next(new ErrorHandler(401, 'Invalid username or password'));
      }
      // User found, compare passwords
      const user = results[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        // If passwords don't match, send error response
        return next(new ErrorHandler(401, 'Invalid username or password'));
      }
      // Generate JWT token
      const token = authService.generateToken(user);
      // Send token in response
      res.status(200).json({ token });
    });
  } catch (error) {
    // Forward error to error handling middleware
    next(error);
  }
};

module.exports = { register, login };
