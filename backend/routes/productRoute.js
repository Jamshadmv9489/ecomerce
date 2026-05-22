import express from 'express';
import { isAdmin, protect } from '../middleware/authMiddleware.js';
import createUpload from '../middleware/uploadMiddleware.js'; 
import validate from '../middleware/validate.js'; 
import { createProductValidator, updateProductValidator } from '../validators/productValidator.js';
import { createProduct, deleteProduct, getProductBySlug, getProducts, updateProduct } from '../controllers/productController.js';

const router = express.Router();

// Initialize upload middleware for the 'products' folder in Cloudinary
const upload = createUpload("products");


/**
 * @desc Create a new product
 * @route POST /api/products
 */
router.post(
    '/', 
    protect,
    isAdmin,
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
    protect,
    isAdmin,
    // 1. Process up to 5 uploaded images (if any are provided for the update)
    upload.array('images', 5), 
    // 2. Run rules for updating fields (all fields are optional)
    updateProductValidator,
    // 3. Catch any validation errors
    validate,
    // 4. Update the product data and handle image replacement
    updateProduct
);

/**
 * @desc Delete a product
 * @route DELETE /api/products/:slug
 */
router.delete(
    '/:slug', 
    protect,
    isAdmin,
    // Validation is usually not needed for deletion, 
    // but you can add an 'admin' middleware here if needed.
    deleteProduct
);

export default router;
