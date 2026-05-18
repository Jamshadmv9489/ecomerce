import { body, param } from 'express-validator';

/**
 * @desc Validation rules for checking Cart requests
 */
export const cartItemValidator = [
    body('productId')
        .trim()
        .notEmpty()
        .withMessage('Product ID is required')
        .isMongoId()
        .withMessage('Please supply a valid product identifier format'),

    body('quantity')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer greater than zero'),
];


/**
 * @desc Validation rules for checking Product ID in URL params
 */
export const productIdParamValidator = [
    param('productId')
        .trim()
        .isMongoId()
        .withMessage('Please supply a valid product identifier format'),
];


/**
 * @desc Validation rules for checking Cart quantity updates
 */
export const updateQuantityValidator = [
    body('productId')
        .trim()
        .notEmpty()
        .withMessage('Product ID is required')
        .isMongoId()
        .withMessage('Please supply a valid product identifier format'),

    body('quantity')
        .trim()
        .notEmpty()
        .withMessage('Quantity is required')
        .isInt({ min: 0 })
        .withMessage('Quantity must be an integer of 0 or greater'),
];
