# Ecommerce-API-with-NodeJs-SQL
#Ecommerce API

This project is an Ecommerce API built with Node.js and Express.js, providing endpoints for managing products, categories, carts, orders, and user authentication.

## Features

- **Product Management**: Create, retrieve, update, and delete products.
- **Category Management**: Create, retrieve, update, and delete categories.
- **User Authentication**: Register new users and authenticate existing users using JWT tokens.
- **Cart Management**: Add products to the cart, view cart contents, update cart items, and remove items from the cart.
- **Order Management**: Place orders, view order history, and fetch order details

Create a .env file in the root directory and add the following environment variables:

MYSQL_DATABASE=ecommerce_db

MYSQL_USERNAME=root

MYSQL_PASSWORD=''

MYSQL_HOST=localhost

MYSQL_PORT=3306


# Start the server:

npm start

# Usage
## Product Endpoints
**POST /products/create**:   Create a new product.  
**GET /products/all**:   Retrieve all products.  
**GET /products/:productId**:   Retrieve product details by ID.  
**GET /products/category/:categoryId**:   Retrieve products by category.  

## Category Endpoints
**POST /category/create**:   Create a new category.  
**GET /category/getAllCategories**:   Retrieve all categories.  
**PATCH /category/updateCategory/:id**:   Update a category.  
**DELETE /category/deleteCategory/:id**:   Delete a category.  

## User Authentication Endpoints
**POST /auth/register**: Register a new user.  
**POST /auth/login**: Authenticate a user and generate a JWT token.  

## Cart Endpoints
**POST /cart/add**: Add a product to the cart.  
**GET /cart/view**: View cart contents.  
**PUT /cart/update/:productId**: Update quantity of a cart item.  
**DELETE /cart/remove/:productId**: Remove a product from the cart.  

## Order Endpoints
**POST /orders/place-order**: Place a new order.  
**GET /orders/order-history**: View order history.  
**GET /orders/order-details/:orderId**: View details of a specific order.  

## Error Handling
Errors are handled centrally using custom error handling middleware. The API returns appropriate status codes and error messages for different scenarios.

## Technologies Used
Node.js  
Express.js  
MySQL  
JWT (JSON Web Tokens) for authentication  
bcrypt for password hashing  

## Contributors
Amit Shringi
