import crypto from "crypto";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/User.js"; // Adjust path as per your directory structure
import ErrorResponse from "../utils/errorResponse.js";
import generateToken from "../utils/generateToken.js";
import { cookieOptions } from "../config/cookieConfig.js";

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


/**
 * @desc Auth User & Get Token (Login)
 * @route POST /api/auth/login
 */
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Retrieve the hidden password field using select("+password")
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ErrorResponse("Invalid credentials", 401);
    }

    // Verify if the provided password matches the hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ErrorResponse("Invalid credentials", 401);
    }

    // Generate the authentication token using the utility function
    const token = generateToken(user);

    // Set the cookie in the response header and send user data without exposing the token in the body
    res.status(200)
        .cookie("token", token, cookieOptions)
        .json({
            success: true,
            message: "User logged in successfully",
            data: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role
            },
        });
});

/**
 * @desc Log User Out / Clear Cookie
 * @route POST /api/auth/logout
 */
export const logoutUser = asyncHandler(async (req, res, next) => {
    // Copy base cookie configuration settings
    const logoutOptions = { ...cookieOptions };

    // Remove active age duration property
    delete logoutOptions.maxAge;

    // Clear client cookie container immediately
    res.status(200)
        .cookie("token", "", {
            ...logoutOptions,
            expires: new Date(0) // Wipe session token instantly
        })
        .json({
            success: true,
            message: "User logged out successfully"
        });
});

/**
 * @desc    Get current logged-in user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const checkAuth = asyncHandler(async (req, res, next) => {
    // req.user is already fetched from DB by protect middleware
    res.status(200).json({
        success: true,
        data: req.user
    });
});


/**
 * @desc Update User Profile
 * @route PUT /api/auth/update
 * @access  Private
 */
export const updateUser = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ErrorResponse("User not found", 404);
    }

    if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            throw new ErrorResponse("Email is already taken", 400);
        }
        user.email = email;
    }

    if (name) user.name = name;

    const updatedUser = await user.save();
    const token = generateToken(updatedUser);

    res.status(200)
        .cookie("token", token, cookieOptions)
        .json({
            success: true,
            message: "User profile updated successfully",
            data: {
                _id: updatedUser._id,
                name: updatedUser.name,
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
            },
        });
});


/**
 * @desc    Update Password
 * @route   PUT /api/auth/updatepassword
 * @access  Private
 */
export const updatePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    // 1. Get user from database with password field
    const user = await User.findById(req.user._id).select("+password");

    // 2. Check if current password matches
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
        throw new ErrorResponse("Current password is incorrect", 401);
    }

    // 3. Set new password
    user.password = newPassword;
    await user.save();

    // 4. Generate new token and send response
    const token = generateToken(user);
    res.status(200)
        .cookie("token", token, cookieOptions)
        .json({
            success: true,
            message: "Password updated successfully"
        });
});


