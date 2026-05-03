// utils/errorResponse.js
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // This removes this class itself from the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorResponse;
