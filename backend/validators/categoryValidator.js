import { body } from "express-validator"; // Import validation tool

// Validation rules for creating a new category
export const createCategoryValidator = [
    body("name")
        .notEmpty()
        .withMessage("Category name is required")
        .isString()
        .withMessage("Name must be a string")
        .trim(), // Remove extra whitespace

    body("description")
        .optional() // Field is not mandatory
        .isString()
        .withMessage("Description must be a string"),
];