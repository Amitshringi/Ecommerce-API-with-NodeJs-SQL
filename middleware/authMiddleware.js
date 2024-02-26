// Importing necessary modules
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../utils/errorHandler');

// Middleware function to handle authentication
const authMiddleware = (req, res, next) => {
  // Extracting token from request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  // Checking if token is missing
  if (!token) {
    return next(new ErrorHandler(401, 'Authorization token is missing'));
  }
  
  try {
    // Verifying and decoding the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Storing user data in request object
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    // Handling token expiration error
    if (error instanceof jwt.TokenExpiredError) {
      return next(new ErrorHandler(401, 'Token has expired'));
    }
    // Handling invalid token error
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ErrorHandler(401, 'Invalid token'));
    }
    // Handling other unexpected errors
    return next(new ErrorHandler(500, 'Internal Server Error'));
  }
};

// Exporting the authentication middleware
module.exports = authMiddleware;
