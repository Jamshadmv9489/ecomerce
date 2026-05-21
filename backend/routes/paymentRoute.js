import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
    checkout,
    verifyPayment
} from '../controllers/paymentController.js';
import { checkoutValidator, verifyPaymentValidator } from '../validators/paymentValidator.js';
import validate from '../middleware/validate.js';

const router = express.Router();

/**
 * @desc    Create Razorpay Order (Generates official Razorpay Order ID)
 * @route   POST /api/payment/checkout
 * @access  Private
 */
router.post(
    '/checkout',
    protect,
    checkoutValidator,
    validate,
    checkout
);

/**
 * @desc    Verify Razorpay Payment and Update Order Status to Paid
 * @route   POST /api/payment/verify
 * @access  Private
 */
router.post(
    '/verify',
    protect,
    verifyPaymentValidator,
    validate,
    verifyPayment
);

export default router;
