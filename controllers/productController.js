const connection = require('../config/database');
const { ErrorHandler } = require('../utils/errorHandler');

// Fetch all products from the database
exports.getAllProducts = (req, res, next) => {
  // Query to fetch all products
  const query = 'SELECT * FROM product';
  // Executing the query
  connection.query(query, (error, results) => {
    if (error) {
      // Handling database error
      throw new ErrorHandler(500, 'Failed to fetch products');
    }
    // Sending response with fetched products
    res.status(200).json(results);
  });
};

// Create a new product
exports.createProduct = (req, res, next) => {
  // Extracting data from request body
  const { title, description, price, quantity, category_id } = req.body;
  
  // Validating request body
  if (!title || !description || !price || !quantity ) {
    return next(new ErrorHandler(400, 'Missing required fields'));
  }
  
  // Creating new product object
  const newProduct = {
    title,
    description,
    price,
    quantity,
    category_id,
    created_at: new Date(), // Current timestamp for created_at
    updated_at: new Date() // Current timestamp for updated_at
  };

  // Query to insert new product
  const query = 'INSERT INTO product SET ?';
  // Executing the query
  connection.query(query, newProduct, (error, results) => {
    if (error) {
      // Handling database error
      return next(new ErrorHandler(500, 'Failed to create product'));
    }
    // Sending response with success message and newly created product's ID
    res.status(201).json({ message: 'Product created successfully', productId: results.insertId });
  });
};

// Fetch product by ID
exports.getProductById = async (req, res, next) => {
  try {
    // Extracting product ID from request parameters
    const { productId } = req.params;
    // Query to fetch product by ID
    const query = 'SELECT * FROM product WHERE id = ?';
    // Executing the query
    connection.query(query, [productId], (error, results) => {
      if (error) {
        // Handling database error
        throw new ErrorHandler(500, 'Failed to fetch product');
      }
      // Checking if product exists
      if (results.length === 0) {
        throw new ErrorHandler(404, 'Product not found');
      }
      // Sending response with fetched product
      res.status(200).json(results[0]);
    });
  } catch (error) {
    // Forwarding error to error handling middleware
    next(error);
  }
};

// Fetch products by category
exports.getProductsByCategory = (req, res, next) => {
  // Extracting category ID from request parameters
  const categoryId = req.params.categoryId;
  // Query to fetch products by category ID
  connection.query('SELECT * FROM product WHERE category_id = ?', [categoryId], (error, results, fields) => {
    if (error) {
      // Handling database error
      return next(error);
    }
    // Sending response with fetched products
    res.json(results);
  });
};
