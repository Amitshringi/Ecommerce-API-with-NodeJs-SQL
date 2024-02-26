// Importing the 'jsonwebtoken' module
const jwt = require('jsonwebtoken');

// Function to generate a JWT token for a user
const generateToken = (user) => {
  // Generating a JWT token with user's ID and a secret key, expiring in 1 hour
  return jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
};

// Exporting the 'generateToken' function to make it accessible from other files
module.exports = { generateToken };
