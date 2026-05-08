import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true, // Optimized for faster search queries
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price cannot be negative"],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category", // Establishes relationship with Category model
            required: [true, "Product must belong to a category"],
        },
        images: [
            {
                url: { type: String, required: true },
                public_id: { type: String, required: true }, // ID from Cloudinary/storage provider
            }
        ],
        stock: {
            type: Number,
            default: 0, // Tracks inventory count
        },
        isActive: {
            type: Boolean,
            default: true, // Controls product visibility in front-end
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

/**
 * Middleware to generate a unique slug before saving a product
 */
productSchema.pre("save", async function () {
    // Only generate slug if the product name has changed
    if (!this.isModified("name")) return;

    const Product = mongoose.model("Product");

    // Convert name to URL-friendly slug: "Nike Shoes" -> "nike-shoes"
    let baseSlug = this.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    let slug = baseSlug;
    let count = 1;

    // Ensure slug is unique by appending a counter if it already exists
    while (await Product.findOne({ slug, _id: { $ne: this._id } })) {
        slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
});

const Product = mongoose.model("Product", productSchema);

export default Product;