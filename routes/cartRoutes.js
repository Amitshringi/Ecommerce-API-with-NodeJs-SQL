const express = require('express');
const router = express.Router();

// Import cart controller
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes for cart management
router.post('/add',authMiddleware, cartController.addToCart);
router.get('/view', cartController.viewCart);
router.put('/update/:productId', cartController.updateCartItem);
router.delete('/remove/:productId', cartController.removeCartItem);

module.exports = router;
