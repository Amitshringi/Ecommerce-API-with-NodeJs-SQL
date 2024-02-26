const connection = require('../config/database');
const { ErrorHandler } = require('../utils/errorHandler');

// Place order for products
const placeOrder = async (req, res, next) => {
  try {
    // Extract user ID from request user data
    const { userId } = req.userData;
    // Extract products from request body
    const { products } = req.body;

    // Assuming products is an array of objects with productId and quantity
    const values = products.map(product => [userId, product.productId, product.quantity]);

    // Query to insert order details into the database
    const query = 'INSERT INTO orders (user_id, product_id, quantity) VALUES ?';
    // Executing the query
    connection.query(query, [values], (error, results) => {
      if (error) {
        // Handling database error
        return next(new ErrorHandler(500, 'Failed to place order'));
      }
      // Sending response after successful order placement
      res.status(200).json({ message: 'Order placed successfully' });
    });
  } catch (error) {
    // Forwarding error to error handling middleware
    next(error);
  }
};

// Get order history for a user
const getOrderHistory = async (req, res, next) => {
  try {
    // Extract user ID from request user data
    const { userId } = req.userData;
    // Query to fetch order history from the database
    const query = 'SELECT * FROM orders WHERE user_id = ?';
    // Executing the query
    connection.query(query, [userId], (error, results) => {
      if (error) {
        // Handling database error
        return next(new ErrorHandler(500, 'Failed to fetch order history'));
      }
      // Sending response with fetched order history
      res.status(200).json(results);
    });
  } catch (error) {
    // Forwarding error to error handling middleware
    next(error);
  }
};

// Get details of a specific order for a user
const getOrderDetails = async (req, res, next) => {
  try {
    // Extract user ID from request user data
    const { userId } = req.userData;
    // Extract order ID from request parameters
    const { orderId } = req.params;
    // Query to fetch order details from the database
    const query = 'SELECT * FROM orders WHERE user_id = ? AND order_id = ?';
    // Executing the query
    connection.query(query, [userId, orderId], (error, results) => {
      if (error) {
        // Handling database error
        return next(new ErrorHandler(500, 'Failed to fetch order details'));
      }
      // Checking if order exists
      if (results.length === 0) {
        return next(new ErrorHandler(404, 'Order not found'));
      }
      // Sending response with fetched order details
      res.status(200).json(results[0]);
    });
  } catch (error) {
    // Forwarding error to error handling middleware
    next(error);
  }
};

module.exports = {
  placeOrder,
  getOrderHistory,
  getOrderDetails
};
