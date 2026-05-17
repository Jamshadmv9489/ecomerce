import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";

/**
 * @desc    Add item to cart / Update quantity
 * @route   POST /api/cart
 * @access  Private
 */
export const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Extracted from protect middleware

    // 1. Check if product exists in database to get the active price
    const product = await Product.findById(productId);
    if (!product) {
        throw new ErrorResponse("Product not found", 404);
    }

    const price = product.price; // Fetch fresh price from database
    const qty = quantity ? Number(quantity) : 1;

    // 2. Find active cart container for logged-in user
    let cart = await Cart.findOne({ user: userId });

    // 3. If no cart container exists, generate a new one
    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [{ product: productId, quantity: qty, price }]
        });
    } else {
        // 4. Check if this specific item is already sitting in the array
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // Product already exists: increment quantity and refresh database price
            cart.items[itemIndex].quantity += qty;
            cart.items[itemIndex].price = price; 
        } else {
            // Product does not exist: push new product entry to items array
            cart.items.push({ product: productId, quantity: qty, price });
        }

        // 5. Save the structural updates back to the database
        await cart.save();
    }

    // 6. Return populated cart so frontend gets instant product details (name, image etc)
    const populatedCart = await cart.populate("items.product", "name price images image");

    res.status(200).json({
        success: true,
        message: "Item added to cart successfully",
        data: populatedCart
    });
});
