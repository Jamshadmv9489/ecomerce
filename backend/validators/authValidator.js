import { body } from "express-validator";

/**
 * @desc Validation rules for User Registration
 */
export const registerValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("User name is required")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters long"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email address is required")
        .isEmail()
        .withMessage("Please fill a valid email address")
        .normalizeEmail(),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];