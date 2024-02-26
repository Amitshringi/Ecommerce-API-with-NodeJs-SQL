const connection = require('../config/database');
//get all the category
exports.getAllCategories = (req, res, next) => {
  connection.query('SELECT * FROM category', (error, results, fields) => {
    if (error) {
      return next(error);
    }
    res.json(results);
  });
};
//create category
exports.createCategory = (req, res, next) => {
  const {name, description} = req?.body?.categoryDetails;
  const newCategory = {
    name: name,
    description: description,
  };
  const query = 'INSERT INTO Category SET ?';
  connection.query(query,newCategory,  (error, results, fields) => {
    if (error) {
      console.log("Error", error);
      return next(error);
    }
    return res.json(results);
  });
};

// Update a category
exports.updateCategory = (req, res, next) => {
  const categoryId = req.params.id;
  const { name, description } = req.body.categoryDetails;
  const updatedCategory = {
    name: name,
    description: description,
  };
  
  const query = 'UPDATE Category SET ? WHERE id = ?';
  connection.query(query, [updatedCategory, categoryId], (error, results, fields) => {
    if (error) {
      console.log("Error", error);
      return next(error);
    }
    res.json(results);
  });
};

// Delete a category
exports.deleteCategory = (req, res, next) => {
  const categoryId = req.params.id;
  
  const query = 'DELETE FROM Category WHERE id = ?';
  connection.query(query, categoryId, (error, results, fields) => {
    if (error) {
      console.log("Error", error);
      return next(error);
    }
    res.json(results);
  });
};
