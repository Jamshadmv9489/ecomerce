import ErrorResponse from '../utils/errorResponse.js';

export const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ErrorResponse) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
