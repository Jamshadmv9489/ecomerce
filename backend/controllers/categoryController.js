import Category from '../models/Category.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

/**
 * @desc Create Category
 * @route POST /api/categories
 */
export const createCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    // Check if a category with the same name already exists
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
        throw new ErrorResponse("Category already exists", 400);
    }

    // Create new category with optional image data from middleware (like Cloudinary)
    const category = await Category.create({
        name,
        description,
        image: {
            url: req.file?.path || req.file?.secure_url,
            public_id: req.file?.filename || req.file?.public_id,
        },
    });

    // Return success response with the created category data
    res.status(201).json({
        success: true,
        data: category,
    });
});

/**
 * @desc Get All Categories
 * @route GET /api/categories
 */
export const getCategories = asyncHandler(async (req, res) => {
    // Fetch all categories from the database
    const categories = await Category.find();

    // Return success response with categories data
    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories,
    });
});
