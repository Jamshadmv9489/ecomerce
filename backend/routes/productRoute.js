import express from 'express';
import upload from '../middleware/uploadMiddleware.js'; 
import validate from '../middleware/validate.js'; 
import { createProductValidator, updateProductValidator } from '../validators/productValidator.js';
import { createProduct, getProductBySlug, getProducts, updateProduct } from '../controllers/productController.js';

const router = express.Router();

/**
 * @desc Create a new product
 * @route POST /api/products
 */
router.post(
    '/', 
    // 1. Process up to 5 uploaded images from the 'images' field
    upload.array('images', 5), 
    // 2. Run rules to check if text fields (name, price, etc.) are valid
    createProductValidator,
    // 3. Catch any validation errors before hitting the controller
    validate,
    // 4. Save the product data and file paths to the database
    createProduct
);

/**
 * @desc Get All Products
 * @route GET /api/products
 */
// Get all products
router.get('/', getProducts);

/**
 * @desc Get Single Product by Slug
 * @route GET /api/products/:slug
 */
// Get all products
router.get('/:slug', getProductBySlug);


/**
 * @desc Update an existing product
 * @route PUT /api/products/:slug
 */
router.put(
    '/:slug', 
    // 1. Process up to 5 uploaded images (if any are provided for the update)
    upload.array('images', 5), 
    // 2. Run rules for updating fields (all fields are optional)
    updateProductValidator,
    // 3. Catch any validation errors
    validate,
    // 4. Update the product data and handle image replacement
    updateProduct
);


export default router;
