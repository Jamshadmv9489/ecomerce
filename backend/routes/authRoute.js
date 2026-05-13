import express from 'express';
import validate from '../middleware/validate.js'; 
import { registerValidator } from '../validators/authValidator.js';
import { registerUser } from '../controllers/authController.js';

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

export default router;
