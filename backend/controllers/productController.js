import { asyncHandler } from "../utils/asyncHandler.js";
import Product from "../models/Product.js";
import ErrorResponse from "../utils/errorResponse.js";
import cloudinary from "../config/cloudinary.js";

/**
 * @desc Create Product
 * @route POST /api/products
 */
export const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, stock, isActive } = req.body;

    // 1. Check if a product with the same name already exists
    const productExists = await Product.findOne({ name });
    if (productExists) {
        throw new ErrorResponse("Product already exists", 400);
    }

    // 2. Prepare images array from middleware (handling multiple files)
    const images = req.files?.map(file => ({
        url: file.path || file.secure_url,
        public_id: file.filename || file.public_id,
    })) || [];

    // 3. Create new product
    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        isActive,
        images, // Saving the array of image objects
    });

    // 4. Return success response
    res.status(201).json({
        success: true,
        data: product,
    });
});


/**
 * @desc Get All Products
 * @route GET /api/products
 */
export const getProducts = asyncHandler(async (req, res) => {
    // 1. Fetch all products from the database
    const products = await Product.find();

    // 2. Return success response
    res.status(200).json({
        success: true,
        count: products.length,
        data: products,
    });
});

/**
 * @desc Get Single Product by Slug
 * @route GET /api/products/:slug
 */
export const getProductBySlug = asyncHandler(async (req, res) => {
    // Find product by the slug passed in the URL
    const product = await Product.findOne({ slug: req.params.slug }).populate('category');

    // Throw error if product is not found
    if (!product) {
        throw new ErrorResponse(`Product not found with slug of ${req.params.slug}`, 404);
    }

    // Return success response with the product data
    res.status(200).json({
        success: true,
        data: product,
    });
});


/**
 * @desc Update Product
 * @route PUT /api/products/:slug
 */
export const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, stock, isActive } = req.body;

    // Find product by slug
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
        throw new ErrorResponse(`Product not found with slug of ${req.params.slug}`, 404);
    }

    // 1. Check if name is changed and if new name already exists
    if (name && name !== product.name) {
        const nameExists = await Product.findOne({ name });
        if (nameExists) {
            throw new ErrorResponse('Product name already exists', 400);
        }
        product.name = name;
    }

    // 2. Update simple fields if they are provided
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (stock !== undefined) product.stock = stock;
    if (isActive !== undefined) product.isActive = isActive;

    // 3. Handle multiple image uploads
    if (req.files && req.files.length > 0) {
        // Delete old images from Cloudinary
        if (product.images && product.images.length > 0) {
            const deletePromises = product.images.map(img => 
                cloudinary.uploader.destroy(img.public_id)
            );
            await Promise.all(deletePromises);
        }

        // Set new images array
        product.images = req.files.map(file => ({
            url: file.path || file.secure_url,
            public_id: file.filename || file.public_id,
        }));
    }

    // 4. Save changes (triggers pre-save hooks for slug updates)
    await product.save();

    res.status(200).json({
        success: true,
        data: product,
    });
});


