import crypto from "crypto";
import mongoose from "mongoose";
import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";

/**
 * @desc    Create Razorpay Order (Generates official Razorpay Order ID)
 * @route   POST /api/payment/checkout
 * @access  Private
 */
export const checkout = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    // 1. Fetch order from database
    const order = await Order.findById(orderId);
    if (!order) {
        throw new ErrorResponse("Order not found", 404);
    }

    // 2. Safeguard: Check if the logged-in user owns this order
    if (order.user.toString() !== req.user._id.toString()) {
        throw new ErrorResponse("Not authorized to pay for this order", 401);
    }

    // 3. Safeguard: Prevent double payment if already paid
    if (order.isPaid) {
        throw new ErrorResponse("This order has already been paid", 400);
    }

    // 4. Configure Razorpay options (Multiply by 100 because Razorpay expects amount in paise)
    const options = {
        amount: Math.round(order.totalPrice * 100), 
        currency: "INR",
        receipt: `receipt_order_${order._id}`,
    };

    try {
        // 5. Generate official Razorpay Order
        const razorpayOrder = await razorpay.orders.create(options);

        // 6. Send success response back to frontend
        res.status(200).json({
            success: true,
            message: "Razorpay order generated successfully",
            data: razorpayOrder,
        });
    } catch (error) {
        throw new ErrorResponse("Razorpay order creation failed. Please try again.", 500);
    }
});


/**
 * @desc    Verify Razorpay Payment Signature & Update Order & Stock
 * @route   POST /api/payment/verify
 * @access  Private
 */
export const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // 1. Check signature (Security check)
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

    if (expectedSign !== razorpay_signature) {
        throw new ErrorResponse("Payment verification failed. Invalid signature.", 400);
    }

    // 2. Find order
    const order = await Order.findById(orderId);
    if (!order) {
        throw new ErrorResponse("Order not found", 404);
    }

    // 3. Prevent duplicate processing
    if (order.isPaid) {
        return res.status(200).json({
            success: true,
            message: "Payment already verified and completed",
        });
    }

    // 4. Start database transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // 5. Update order details
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentMethod = "Razorpay";
        order.paymentResult = {
            id: razorpay_payment_id,
            status: "Captured",
            updateTime: new Date().toISOString(),
        };
        
        await order.save({ session });

        // 6. Decrease product stock safely
        for (const item of order.items) {
            const updatedProduct = await Product.findOneAndUpdate(
                { _id: item.product, stock: { $gte: item.quantity } },
                { $inc: { stock: -item.quantity } },
                { session, returnDocument: 'after' }
            );

            // Rollback if out of stock
            if (!updatedProduct) {
                throw new ErrorResponse(`Out of stock for product ID: ${item.product}`, 400);
            }
        }

        // 7. Save changes permanently
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: "Payment verified and completed successfully",
        });

    } catch (error) {
        // 8. Cancel all database changes if an error occurs
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
});

