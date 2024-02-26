const express = require('express');
const router = express.Router();

// Import order controller
const orderController = require('../controllers/orderController');

// Define routes for order management
router.post('/place-order', orderController.placeOrder);
router.get('/order-history', orderController.getOrderHistory);
router.get('/order-details/:orderId', orderController.getOrderDetails);

module.exports = router;
