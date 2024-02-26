// Importing necessary modules
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Defining the User model using Sequelize
const User = sequelize.define('User', {
  // Field for username
  username: {
    type: DataTypes.STRING,
    allowNull: false, // Username cannot be null
    unique: true, // Username must be unique
  },
  // Field for password
  password: {
    type: DataTypes.STRING,
    allowNull: false, // Password cannot be null
  },
});

// Exporting the User model for use in other parts of the application
module.exports = User;
