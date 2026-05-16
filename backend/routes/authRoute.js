import express from 'express';
import validate from '../middleware/validate.js';
import { loginValidator, registerValidator, updatePasswordValidator, updateValidator } from '../validators/authValidator.js';
import { checkAuth, loginUser, logoutUser, registerUser, updatePassword, updateUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 */
router.post(
    '/register',
    // 1. Run express-validator rules to ensure clean request inputs
    registerValidator,
    // 2. Catch and stop execution if validation rules fail
    validate,
    // 3. Process database creation using automated username extraction
    registerUser
);

/**
 * @desc User Login
 * @route POST /api/auth/login
 */
router.post('/login', loginValidator, validate, loginUser);

/**
 * @desc    Log User Out / Clear Cookie
 * @route   POST /api/auth/logout
 * @access  Public (Does not require an active session token)
 */
router.post('/logout', logoutUser);

/**
 * @desc    Get current logged-in user profile
 * @route   GET /api/auth/me
 * @access  Private
 */router.get('/me', protect, checkAuth);

/**
 * @desc    Update User Profile
 * @route   PUT /api/auth/update
 * @access  Private
 */
router.put('/update', protect, updateValidator, validate, updateUser);

/**
 * @desc    Update Password
 * @route   PUT /api/auth/updatepassword
 * @access  Private
 */
router.put('/update-password', protect, updatePasswordValidator, validate, updatePassword);


export default router;
