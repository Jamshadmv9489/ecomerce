import { body } from "express-validator";

/**
 * Validation rules for creating a new product
 */
export const createProductValidator = [
    body("name")
        .notEmpty()
        .withMessage("Product name is required")
        .isString()
        .withMessage("Name must be a string")
        .trim(), // Removes leading/trailing whitespace

    body("description")
        .notEmpty()
        .withMessage("Product description is required")
        .isString()
        .withMessage("Description must be a string")
        .trim(),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isNumeric()
        .withMessage("Price must be a number")
        .custom((value) => value >= 0)
        .withMessage("Price cannot be negative"), // Ensures price isn't below zero

    body("category")
        .notEmpty()
        .withMessage("Category is required")
        .isMongoId()
        .withMessage("Invalid category ID format"), // Validates MongoDB ObjectId format

    body("stock")
        .optional()
        .isNumeric()
        .withMessage("Stock must be a number")
        .custom((value) => value >= 0)
        .withMessage("Stock cannot be negative"),

    body("isActive")
        .optional()
        .isBoolean()
        .withMessage("isActive must be a boolean value"), // Ensures true/false value
];
