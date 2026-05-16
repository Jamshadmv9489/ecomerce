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


/**
 * @desc Validation rules for User Login
 */
export const loginValidator = [
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
        .withMessage("Password is required"),
];


/**
 * @desc Validation rules for User Profile Update
 */
export const updateValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty"),

    body("email")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Email address cannot be empty")
        .isEmail()
        .withMessage("Please fill a valid email address")
        .normalizeEmail(),
];

/**
 * @desc Validation rules for Password Update
 */
export const updatePasswordValidator = [
    body("currentPassword")
        .trim()
        .notEmpty()
        .withMessage("Current password is required"),

    body("newPassword")
        .trim()
        .notEmpty()
        .withMessage("New password is required")
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters"),
];


