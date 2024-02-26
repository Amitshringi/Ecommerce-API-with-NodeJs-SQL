// // const mysql = require('mysql');
// const dotenv = require('dotenv');

// dotenv.config(); // Load environment variables from .env file

// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: ''
// });

// module.exports = connection;

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'AmitS',
  database: 'ecommerce'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');

  // Create category Schema
  const categorySchema = `
  CREATE TABLE IF NOT EXISTS Category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`

// Create product Schema
const productSchema = `CREATE TABLE IF NOT EXISTS Product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    quantity INT,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Category(id)
);`

// Create User Schema
const userSchema = `CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255), -- hashed password
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`

// Create cart Schema
const cartSchema = `CREATE TABLE IF NOT EXISTS Cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (product_id) REFERENCES Product(id)
);`

// Create order Schema
const orderSchema = `CREATE TABLE IF NOT EXISTS Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id)
);`

// Create orderDetails Schema
const orderDetailsSchema = `CREATE TABLE IF NOT EXISTS OrderDetail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Product(id)
);`

//   `;

  connection.query(categorySchema, (err, result) => {
    if (err) throw err;
    console.log('categorySchema created successfully');
  });
  connection.query(productSchema, (err, result) => {
    if (err) throw err;
    console.log('productSchema created successfully');
  });
  connection.query(userSchema, (err, result) => {
    if (err) throw err;
    console.log('User schema created successfully');
  });
  connection.query(cartSchema, (err, result) => {
    if (err) throw err;
    console.log('cartSchema created successfully');
  });
  connection.query(orderSchema, (err, result) => {
    if (err) throw err;
    console.log('orderSchema created successfully');
  });
  connection.query(orderDetailsSchema, (err, result) => {
    if (err) throw err;
    console.log('orderDetailsSchema created successfully');
  });

  // Create remaining schemas (repeat the same pattern for each schema)
  // ...

//   connection.end((err) => {
//     if (err) throw err;
//     console.log('Connection closed');
//   });
});

module.exports = connection;