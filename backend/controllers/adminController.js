import Order from '../models/Order.js'
import User from '../models/User.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorResponse from '../utils/errorResponse.js'

/**
 * @desc    Get Admin Dashboard Analytics
 * @route   GET /api/admin/analytics
 * @access  Private/Admin
 */
export const getAnalytics = asyncHandler(async (req, res) => {
    // 1. Calculate total sales revenue (only for orders that are paid)
    const salesData = await Order.aggregate([
        { $match: { isPaid: true } },
        { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } }
    ]);

    // 2. Extract total sales or default to 0 if no paid orders exist
    const totalSales = salesData.length > 0 ? salesData[0].totalSales : 0;

    // 3. Fetch independent document counts from database
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: "customer" });

    // Optional: Handle scenario where database fetch fails unexpectedly
    if (totalSales === undefined || totalOrders === undefined || totalUsers === undefined) {
        throw new ErrorResponse("Failed to fetch analytics data", 500);
    }

    // 4. Return structured analytical data to the admin dashboard
    res.status(200).json({
        success: true,
        message: "Analytics data fetched successfully",
        data: {
            totalSales,
            totalOrders,
            totalUsers
        }
    });
});

/**
 * @desc    Get All Orders
 * @route   GET /api/admin/orders
 * @access  Private/Admin
 */
export const getAllOrders = asyncHandler(async (req, res) => {
    // .lean() improves performance for read-only queries
    const orders = await Order.find({})
        .populate("user", "id name email")
        .sort({ createdAt: -1 })
        .lean();

    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
    });
});


/**
 * @desc    Update Order Status
 * @route   PUT /api/admin/orders/:id/status
 * @access  Private/Admin
 */
export const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    // Validate request body
    const allowedStatuses = ["Shipped", "Delivered", "Cancelled"];
    if (!allowedStatuses.includes(status)) {
        throw new ErrorResponse("Invalid status value", 400);
    }

    // Validate MongoDB ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ErrorResponse("Invalid Order ID format", 400);
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
        throw new ErrorResponse("Order not found", 404);
    }

    // Prevent modifications on finalized orders
    if (order.orderStatus === "Delivered" || order.orderStatus === "Cancelled") {
        throw new ErrorResponse(`Cannot change status. Order is already ${order.orderStatus}`, 400);
    }

    // Business rule: Must be Shipped before Delivered
    if (status === "Delivered" && order.orderStatus !== "Shipped") {
        throw new ErrorResponse("Order must be Shipped before marking as Delivered", 400);
    }

    // Update status and timestamp if delivered
    order.orderStatus = status;
    if (status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();

    res.status(200).json({
        success: true,
        message: `Order status updated to ${status}`,
        data: updatedOrder
    });
});



