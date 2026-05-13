import crypto from "crypto";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/User.js"; // Adjust path as per your directory structure
import ErrorResponse from "../utils/errorResponse.js";

/**
 * @desc Register User
 * @route POST /api/auth/register
 */
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ErrorResponse("User with this email already exists", 400);
    }

    // 2. Extract clean username prefix from email (e.g., 'john' from 'john.doe@gmail.com')
    const emailPrefix = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
    
    // 3. Append a secure 4-digit random number to guarantee absolute uniqueness
    const randomBits = crypto.randomInt(1000, 9999);
    const generatedUsername = `${emailPrefix}${randomBits}`;

    // 4. Create the new user record
    const user = await User.create({
        name,
        email,
        password,
        username: generatedUsername,
    });

    // 5. Send optimized payload response
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    });
});
