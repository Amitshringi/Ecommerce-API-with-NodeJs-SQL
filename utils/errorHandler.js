/**
 * Custom error handler class to handle errors with status code and message.
 */
class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  
  const errorHandler = (err, req, res, next) => {
    const { statusCode = 500, message = 'Internal Server Error' } = err;
    res.status(statusCode).json({ message });
  };
  
  module.exports = { ErrorHandler, errorHandler };
  