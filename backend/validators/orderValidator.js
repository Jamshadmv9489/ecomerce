import { body } from 'express-validator';

/**
 * @desc Validation rules for creating a new order
 */
export const createOrderValidator = [
    // 1. Shipping Address Validation
    body('shippingAddress')
        .notEmpty()
        .withMessage('Shipping address is required')
        .isObject()
        .withMessage('Shipping address must be an object'),

    body('shippingAddress.street')
        .trim()
        .notEmpty()
        .withMessage('Street address is required'),

    body('shippingAddress.city')
        .trim()
        .notEmpty()
        .withMessage('City is required'),

    body('shippingAddress.state')
        .trim()
        .notEmpty()
        .withMessage('State is required'),

    body('shippingAddress.postalCode')
        .trim()
        .notEmpty()
        .withMessage('Postal code is required'),

    body('shippingAddress.country')
        .trim()
        .notEmpty()
        .withMessage('Country is required'),

    body('shippingAddress.phone')
        .trim()
        .notEmpty()
        .withMessage('Contact phone number is required'),

    // 2. Payment Method Validation
    body('paymentMethod')
        .trim()
        .notEmpty()
        .withMessage('Payment method is required')
        .isIn(['COD', 'Razorpay', 'Stripe'])
        .withMessage('Please supply a valid payment method (COD, Razorpay, or Stripe)'),

    // 3. Direct Checkout Flag Validation
    body('isDirectCheckout')
        .notEmpty()
        .withMessage('isDirectCheckout flag is required')
        .isBoolean()
        .withMessage('isDirectCheckout must be a boolean value'),

    // 4. Conditional Validation for orderItems (Runs only if isDirectCheckout is true)
    body('orderItems')
        .if((value, { req }) => req.body.isDirectCheckout === true || req.body.isDirectCheckout === 'true')
        .notEmpty()
        .withMessage('Order items are required for direct checkout')
        .isArray({ min: 1 })
        .withMessage('Order items must be an array with at least one product'),

    body('orderItems.*.product')
        .if((value, { req }) => req.body.isDirectCheckout === true || req.body.isDirectCheckout === 'true')
        .trim()
        .notEmpty()
        .withMessage('Product ID inside order items is required')
        .isMongoId()
        .withMessage('Please supply a valid product identifier format for items'),

    body('orderItems.*.quantity')
        .if((value, { req }) => req.body.isDirectCheckout === true || req.body.isDirectCheckout === 'true')
        .notEmpty()
        .withMessage('Quantity inside order items is required')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer greater than zero'),
];
