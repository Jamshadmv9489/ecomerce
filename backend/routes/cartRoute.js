import express from 'express';
import validate from '../middleware/validate.js';
import { protect } from '../middleware/authMiddleware.js';
import { cartItemValidator } from '../validators/cartItemValidator.js';
import { addToCart, getCart } from '../controllers/cartController.js';

const router = express.Router();

/**
 * @desc    Add item to cart / Update quantity
 * @route   POST /api/cart
 * @access  Private
 */
router.post(
    '/',
    protect,
    cartItemValidator,
    validate,
    addToCart
);

/**
 * @desc    Get logged-in user's cart
 * @route   GET /api/cart
 * @access  Private
 */
router.get('/', protect, getCart);

export default router;
