import { body } from 'express-validator';

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
