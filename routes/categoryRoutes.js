// Importing the necessary modules
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Route to create a new category
router.post('/create', categoryController.createCategory);

// Route to get all categories
router.get('/getAllCategories', categoryController.getAllCategories);

// Route to update a category by its ID
router.patch('/updateCategory/:id', categoryController.updateCategory);

// Route to delete a category by its ID
router.delete('/deleteCategory/:id', categoryController.deleteCategory);

// Exporting the router to make it accessible from other files
module.exports = router;
