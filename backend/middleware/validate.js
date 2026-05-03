import { validationResult } from "express-validator"; // Utility to collect validation results

// Middleware to check for validation errors before hitting the controller
const validate = (req, res, next) => {
    const errors = validationResult(req); // Capture any errors from the validator

    if (!errors.isEmpty()) {
        // Return 400 Bad Request if errors exist
        return res.status(400).json({
            success: false,
            errors: errors.array().map((err) => ({
                field: err.path, // The input field that failed
                message: err.msg, // The error message defined in validator
            })),
        });
    }

    next(); // Proceed to the next middleware or controller if no errors
};

export default validate;