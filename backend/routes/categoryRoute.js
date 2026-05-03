import express from 'express';
import { createCategory } from '../controllers/categoryController.js'; // Logic for creating category
import upload from '../middleware/uploadMiddleware.js'; // Handles single image file upload
import { createCategoryValidator } from '../validators/categoryValidator.js'; // Rules for data validation
import validate from '../middleware/validate.js'; // Checks validation results before moving to controller

const router = express.Router();

/**
 * @desc Create Category
 * @route POST /api/categories
 */
// Handle file upload, validate input, check for errors, then create category
router.post('/', upload.single('image'), createCategoryValidator, validate, createCategory);

export default router;