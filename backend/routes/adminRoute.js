import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { getAnalytics } from '../controllers/adminController.js';

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

export default router;
