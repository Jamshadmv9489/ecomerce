import jwt from "jsonwebtoken";
import User  from "../models/User.js"; 
import { asyncHandler } from "../utils/asyncHandler.js"; 
import ErrorResponse from "../utils/errorResponse.js"; 

/**
 * @desc    Middleware to protect routes by verifying JWT in HTTP-only cookie
 * @route   Private Routes
 * @access  Protected
 */
export const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Extract token from cookie container
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    // Return error if no token is found
    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    try {
        // Verify token signatures against secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user matching payload ID and omit password field
        req.user = await User.findById(decoded.id).select("-password");

        // Return error if user record is missing in database
        if (!req.user) {
            return next(new ErrorResponse("User no longer exists", 401));
        }

        next(); 
    } catch (error) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }
});

/**
 * @desc    Middleware to restrict access to administrator role only
 * @route   Admin Routes
 * @access  Admin-Only
 */
export const isAdmin = (req, res, next) => {
    // Validate authorization and verify admin role string
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return next(new ErrorResponse("Access denied: Administrator privileges required", 403));
    }
};
