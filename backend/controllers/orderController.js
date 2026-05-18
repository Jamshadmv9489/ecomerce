import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import ErrorResponse from "../utils/errorResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * @desc    Create New Order (Supports both Cart and Direct Checkout)
 * @route   POST /api/order
 * @access  Private
 */
export const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { orderItems, shippingAddress, paymentMethod, isDirectCheckout } = req.body;

    if (!shippingAddress) {
        throw new ErrorResponse("Please provide a shipping address", 400);
    }

    let finalOrderItems = [];
    let finalTotalPrice = 0;

    // --- CASE 1: DIRECT CHECKOUT (BUY NOW) ---
    if (isDirectCheckout) {
        if (!orderItems || orderItems.length === 0) {
            throw new ErrorResponse("No items provided for checkout", 400);
        }

        // Fetch prices from database to prevent manipulation
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            if (!product) {
                throw new ErrorResponse("Product not found", 404);
            }

            finalOrderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });

            finalTotalPrice += product.price * item.quantity;
        }

        // --- CASE 2: NORMAL CART CHECKOUT ---
    } else {
        const cart = await Cart.findOne({ user: userId });
        if (!cart || cart.items.length === 0) {
            throw new ErrorResponse("Your cart is empty", 400);
        }

        finalOrderItems = cart.items;
        finalTotalPrice = cart.totalPrice; // Uses your virtual property

        // Clear user's cart after checkout
        cart.items = [];
        await cart.save();
    }

    // 3. Create order with your model required fields (Fixed shipping/tax for now)
    const order = await Order.create({
        user: userId,
        items: finalOrderItems, // Matches your orderSchema field name
        shippingAddress,
        paymentMethod,
        itemsPrice: finalTotalPrice,
        shippingPrice: 0.0, // Fixed 0 for this feature branch
        taxPrice: 0.0,      // Fixed 0 for this feature branch
        totalPrice: finalTotalPrice,
    });

    // Reduce product stock immediately only for Cash on Delivery (COD) orders
    if (paymentMethod === "COD") {
        for (const item of finalOrderItems) {
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { stock: -item.quantity } } // Subtract bought quantity from stock
            );
        }
    }

    // 4. Send response to frontend
    res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order
    });
});

