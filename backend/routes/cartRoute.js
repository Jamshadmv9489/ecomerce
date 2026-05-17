import express from 'express';
import validate from '../middleware/validate.js';
import { protect } from '../middleware/authMiddleware.js';
import { cartItemValidator, productIdParamValidator } from '../validators/cartItemValidator.js';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';

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

/**
 * @desc    Remove an item from cart completely
 * @route   DELETE /api/cart/:productId
 * @access  Private
 */
router.delete('/:productId', protect, productIdParamValidator, validate, removeFromCart);

export default router;
