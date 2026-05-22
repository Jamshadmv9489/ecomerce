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
