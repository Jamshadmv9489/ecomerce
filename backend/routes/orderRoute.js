import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createOrderValidator } from '../validators/orderValidator.js';
import validate from '../middleware/validate.js';
import { 
    createOrder,
    getMyOrders,
    getOrderById
} from '../controllers/orderController.js';

const router = express.Router();

/**
 * @desc    Create a new order from checkout container
 * @route   POST /api/order
 * @access  Private
 */
router.post(
    '/',
    protect,
    createOrderValidator,
    validate,
    createOrder
);

/**
 * @desc    Get Logged-In User Orders (Order History)
 * @route   GET /api/order/myorders
 * @access  Private
 */
router.get('/myorders', protect, getMyOrders);

/**
 * @desc    Get Logged-In User Orders (Order History)
 * @route   GET /api/order/:orderId
 * @access  Private
 */
router.get('/:orderId', protect, getOrderById);

export default router;
