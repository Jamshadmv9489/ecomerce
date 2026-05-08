import { asyncHandler } from "../utils/asyncHandler.js";
import Product from "../models/Product.js";
import ErrorResponse from "../utils/errorResponse.js";

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
