const connection = require('../config/database');
const { ErrorHandler } = require('../utils/errorHandler');

// Add a product to the user's cart
const addToCart = async (req, res, next) => {
  try {
    // Extract user ID from request user data
    const { userId } = req.userData;
    // Extract product ID and quantity from request body
    const { productId, quantity } = req.body;
    // SQL query to insert product into the cart
    const query = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
    // Execute the query
    connection.query(query, [userId, productId, quantity], (error, results) => {
      if (error) {
        // Handle database error
        return next(new ErrorHandler(500, 'Failed to add product to cart'));
      }
      // Send success response
      res.status(200).json({ message: 'Product added to cart successfully' });
    });
  } catch (error) {
    // Forward error to error handling middleware
    next(error);
  }
};

// View user's cart
const viewCart = (req, res, next) => {
  try {
    // Extract user ID from request user data
    const { userId } = req.userData;
    // SQL query to fetch user's cart data
    const query = 'SELECT * FROM cart WHERE user_id = ?';
    // Execute the query
    connection.query(query, [userId], (error, results) => {
      if (error) {
        // Handle database error
        return next(new ErrorHandler(500, 'Failed to fetch cart data'));
      }
      // Send fetched cart data as response
      res.status(200).json(results);
    });
  } catch (error) {
    // Forward error to error handling middleware
    next(error);
  }
};

// Update quantity of a product in the user's cart
const updateCartItem = async (req, res, next) => {
  try {
    // Extract user ID from request user data
    const { userId } = req.userData;
    // Extract product ID and quantity from request parameters and body
    const { productId } = req.params;
    const { quantity } = req.body;
    // SQL query to update quantity of a product in the cart
    const query = 'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?';
    // Execute the query
    connection.query(query, [quantity, userId, productId], (error, results) => {
      if (error) {
        // Handle database error
        return next(new ErrorHandler(500, 'Failed to update cart item'));
      }
      // Send success response
      res.status(200).json({ message: 'Cart item updated successfully' });
    });
  } catch (error) {
    // Forward error to error handling middleware
    next(error);
  }
};

// Remove a product from the user's cart
const removeCartItem = async (req, res, next) => {
  try {
    // Extract user ID from request user data
    const { userId } = req.userData;
    // Extract product ID from request parameters
    const { productId } = req.params;
    // SQL query to delete product from the cart
    const query = 'DELETE FROM cart WHERE user_id = ? AND product_id = ?';
    // Execute the query
    connection.query(query, [userId, productId], (error, results) => {
      if (error) {
        // Handle database error
        return next(new ErrorHandler(500, 'Failed to remove cart item'));
      }
      // Send success response
      res.status(200).json({ message: 'Cart item removed successfully' });
    });
  } catch (error) {
    // Forward error to error handling middleware
    next(error);
  }
};

module.exports = {
  addToCart,
  viewCart,
  updateCartItem,
  removeCartItem
};
