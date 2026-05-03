/**
 * A wrapper function to handle errors in asynchronous routes
 * It eliminates the need for repeated try-catch blocks
 */
export const asyncHandler = (fn) => {
    // Returns a standard Express middleware function
    return function asyncMiddleware(req, res, next) {
        // Executes the passed function (fn) and ensures it's treated as a Promise
        // If the Promise fails, .catch(next) automatically sends the error to the global error handler
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};