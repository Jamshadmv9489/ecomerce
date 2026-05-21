import { body } from 'express-validator';

/**
 * @desc Validation rules for creating a Razorpay order (Checkout)
 */
export const checkoutValidator = [
    body('orderId')
        .trim()
        .notEmpty()
        .withMessage('Order ID is required to initiate checkout')
        .isMongoId()
        .withMessage('Please supply a valid database order identifier format'),
];

/**
 * @desc Validation rules for verifying a Razorpay payment signature
 */
export const verifyPaymentValidator = [
    // 1. Database Order ID Verification
    body('orderId')
        .trim()
        .notEmpty()
        .withMessage('Order ID is required for verification')
        .isMongoId()
        .withMessage('Please supply a valid database order identifier format'),

    // 2. Official Razorpay Order ID Validation
    body('razorpay_order_id')
        .trim()
        .notEmpty()
        .withMessage('Razorpay Order ID is required')
        .matches(/^order_/)
        .withMessage('Invalid Razorpay Order ID format. It must start with "order_"'),

    // 3. Official Razorpay Payment ID Validation
    body('razorpay_payment_id')
        .trim()
        .notEmpty()
        .withMessage('Razorpay Payment ID is required')
        .matches(/^pay_/)
        .withMessage('Invalid Razorpay Payment ID format. It must start with "pay_"'),

    // 4. Secure Signature String Validation
    body('razorpay_signature')
        .trim()
        .notEmpty()
        .withMessage('Razorpay Signature is required')
        .isLength({ min: 64, max: 64 })
        .withMessage('Signature must be a valid 64-character hexadecimal string'),
];
