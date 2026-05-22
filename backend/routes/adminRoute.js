import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { getAllOrders, getAnalytics, updateOrderStatus } from '../controllers/adminController.js';

const router = express.Router();

// Apply protection to all admin routes globally instead of repeating it on every route
router.use(protect);
router.use(isAdmin); // Restricts access to users where role is "admin"

/**
 * @desc    Get Admin Dashboard Analytics
 * @route   GET /api/admin/analytics
 * @access  Private/Admin
 */
router.get(
    '/analytics',
    getAnalytics
);

/**
 * @desc    Get All Orders
 * @route   GET /api/admin/orders
 * @access  Private/Admin
 */
router.get('/orders', getAllOrders);

/**
 * @desc    Update Order Status
 * @route   PUT /api/admin/orders/:id/status
 * @access  Private/Admin
 */
router.put('/orders/:id/status', updateOrderStatus);

export default router;
