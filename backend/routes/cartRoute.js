import express from 'express';
import validate from '../middleware/validate.js';
import { protect } from '../middleware/authMiddleware.js';
import { cartItemValidator } from '../validators/cartItemValidator.js';
import { addToCart } from '../controllers/cartController.js';

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

export default router;
