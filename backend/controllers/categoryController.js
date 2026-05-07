import { v2 as cloudinary } from "cloudinary";

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

/**
 * @desc Get Single Category by Slug
 * @route GET /api/categories/:slug
 */
export const getCategory = asyncHandler(async (req, res) => {
    // Find category by the slug passed in the URL
    const category = await Category.findOne({ slug: req.params.slug });

    // Throw error if category is not found
    if (!category) {
        throw new ErrorResponse(`Category not found with slug of ${req.params.slug}`, 404);
    }

    // Return success response with the category data
    res.status(200).json({
        success: true,
        data: category,
    });
});


/**
 * @desc Update Category
 * @route PUT /api/categories/:slug
 */
export const updateCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    // Find category by slug
    const category = await Category.findOne({ slug: req.params.slug });

    if (!category) {
        throw new ErrorResponse(`Category not found with slug of ${req.params.slug}`, 404);
    }

    // 1. Check if name is provided and has actually changed
    if (name && name !== category.name) {
        // Check if the new name is already taken by another category
        const nameExists = await Category.findOne({ name });
        if (nameExists) {
            throw new ErrorResponse('Category name already exists', 400);
        }
        // Update to the new name
        category.name = name;
    }

    // 2. Update description if a new one is provided
    if (description) category.description = description;


    // Handle image upload
    if (req.file) {
        // Delete old image from Cloudinary
        if (category.image && category.image.public_id) {
            await cloudinary.uploader.destroy(category.image.public_id);
        }

        // Set new image data
        category.image = {
            url: req.file.path || req.file.secure_url,
            public_id: req.file.filename || req.file.public_id,
        };
    }

    // Save changes (triggers pre-save hooks for slug updates)
    await category.save();

    res.status(200).json({
        success: true,
        data: category,
    });
});


/**
 * @desc Delete Category
 * @route DELETE /api/categories/:slug
 */
export const deleteCategory = asyncHandler(async (req, res) => {
    // 1. Find category by slug
    const category = await Category.findOne({ slug: req.params.slug });

    if (!category) {
        throw new ErrorResponse(`Category not found with slug of ${req.params.slug}`, 404);
    }

    // 2. Delete image from Cloudinary if it exists
    if (category.image && category.image.public_id) {
        await cloudinary.uploader.destroy(category.image.public_id);
    }

    // 3. Remove category from database
    await category.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Category deleted successfully',
        data: {}
    });
});
