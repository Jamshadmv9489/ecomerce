import express from 'express';
import upload from '../middleware/uploadMiddleware.js'; 
import validate from '../middleware/validate.js'; 
import { createProductValidator } from '../validators/productValidator.js';
import { createProduct } from '../controllers/productController.js';

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

export default router;
