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


/**
 * @desc    Get logged-in user's cart
 * @route   GET /api/cart
 * @access  Private
 */
export const getCart = asyncHandler(async (req, res) => {
    // 1. Fetch user's cart and populate product details
    const cart = await Cart.findOne({ user: req.user._id }).populate(
        "items.product",
        "name price images image slug"
    );

    // 2. If no cart exists, return a standard empty cart object instead of null
    if (!cart) {
        return res.status(200).json({
            success: true,
            data: {
                user: req.user._id,
                items: [],
                totalPrice: 0,
                totalItems: 0
            }
        });
    }

    // 3. Return cart (totalPrice and totalItems are calculated automatically)
    res.status(200).json({
        success: true,
        data: cart
    });
});


/**
 * @desc    Remove an item from cart completely
 * @route   DELETE /api/cart/:productId
 * @access  Private
 */
export const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    // 1. Find user's cart and remove the product matching the ID from the items array
    const cart = await Cart.findOneAndUpdate(
        { user: userId },
        { $pull: { items: { product: productId } } },
        { returnDocument: 'after' } // Returns the updated document after deletion
    ).populate("items.product", "name price images image slug");

    // 2. If the user doesn't have an active cart container, stop execution
    if (!cart) {
        throw new ErrorResponse("Cart not found", 404);
    }

    // 3. Return the updated cart structure with recalculated totals
    res.status(200).json({
        success: true,
        message: "Item removed from cart successfully",
        data: cart
    });
});


/**
 * @desc    Update specific item quantity in cart
 * @route   PUT /api/cart/update-quantity
 * @access  Private
 */
export const updateCartQuantity = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const targetQuantity = Number(quantity);

    // 1. If quantity is set to 0 or less, completely remove the item from the cart
    if (targetQuantity <= 0) {
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { items: { product: productId } } },
            { returnDocument: 'after' }
        ).populate("items.product", "name price images image slug");

        if (!cart) throw new ErrorResponse("Cart not found", 404);

        return res.status(200).json({
            success: true,
            message: "Item removed from cart due to zero quantity",
            data: cart
        });
    }

    // 2. Fetch fresh price from database to safeguard against price manipulation
    const product = await Product.findById(productId);
    if (!product) {
        throw new ErrorResponse("Product not found", 404);
    }

    // 3. Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new ErrorResponse("Cart not found", 404);
    }

    // 4. Find the item index in the cart array
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
        throw new ErrorResponse("Item not found in cart", 404);
    }

    // 5. Update the row with the new clean quantity and refresh database price
    cart.items[itemIndex].quantity = targetQuantity;
    cart.items[itemIndex].price = product.price;

    // 6. Save structural updates and populate product metadata for the frontend
    await cart.save();
    const populatedCart = await cart.populate("items.product", "name price images image slug");

    res.status(200).json({
        success: true,
        message: "Cart quantity updated successfully",
        data: populatedCart
    });
});

