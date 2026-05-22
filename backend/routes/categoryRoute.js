import express from 'express';
import { isAdmin, protect } from '../middleware/authMiddleware.js';
import createUpload from '../middleware/uploadMiddleware.js'; // Import the file upload utility based on Cloudinary and Multer
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/categoryController.js'; // Logic for category controller
import { createCategoryValidator, updateCategoryValidator } from '../validators/categoryValidator.js'; // Rules for data validation
import validate from '../middleware/validate.js'; // Checks validation results before moving to controller

const router = express.Router();

// Initialize upload middleware for the 'categories' folder in Cloudinary
const upload = createUpload("categories");

/**
 * @desc Create Category
 * @route POST /api/categories
 */
// Handle file upload, validate input, check for errors, then create category
router.post('/', protect, isAdmin, upload.single('image'), createCategoryValidator, validate, createCategory);

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
router.put('/:slug', protect, isAdmin, upload.single('image'), updateCategoryValidator, validate, updateCategory);

/**
 * @desc Delete Category
 * @route DELETE /api/categories/:slug
 */
// Delete Category by slug
router.delete('/:slug', protect, isAdmin, deleteCategory);

export default router;