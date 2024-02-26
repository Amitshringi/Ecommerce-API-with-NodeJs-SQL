// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController'); // Import productController

// // Define product routes
// router.get('/', (req, res) => {
//   res.send('Product Listing');
// });

// router.get('/:productId', (req, res) => {
//   const { productId } = req.params;
//   res.send(`Product Details for product ID ${productId}`);
// });

// router.get('/category/:categoryId', productController.getProductsByCategory);

// // Export the router
// module.exports = router;

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define product routes
// router.get('/', (req, res) => {
//   res.send('Product Listing');
// });

// Route to create a new product
router.post('/create', productController.createProduct);


// Route to fetch all products
router.get('/all', productController.getAllProducts);

router.get('/:productId', (req, res) => {
  const { productId } = req.params;
  res.send(`Product Details for product ID ${productId}`);
});

// Endpoint for retrieving products by category ID
router.get('/category/:categoryId', productController.getProductsByCategory);

// Export the router
module.exports = router;
