import express from 'express';
import { createCategory, getCategories, getCategory, updateCategory } from '../controllers/categoryController.js'; // Logic for category controller
import upload from '../middleware/uploadMiddleware.js'; // Handles single image file upload
import { createCategoryValidator, updateCategoryValidator } from '../validators/categoryValidator.js'; // Rules for data validation
import validate from '../middleware/validate.js'; // Checks validation results before moving to controller

const router = express.Router();

/**
 * @desc Create Category
 * @route POST /api/categories
 */
// Handle file upload, validate input, check for errors, then create category
router.post('/', upload.single('image'), createCategoryValidator, validate, createCategory);

/**
 * @desc Get All Categories
 * @route GET /api/categories
 */
// Get all Categories
router.get('/', getCategories);

/**
 * @desc Get Single Category by Slug
 * @route GET /api/categories/:slug
 */
// Single Category by Slug
router.get('/:slug', getCategory);

/**
 * @desc Update Category
 * @route PUT /api/categories/:slug
 */
// Update Category by slug
router.put('/:slug', upload.single('image'), updateCategoryValidator, validate, updateCategory);

export default router;