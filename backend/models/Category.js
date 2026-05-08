import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            trim: true,
            unique: true, // Prevents duplicate names
        },

        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true, // Optimizes search performance
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        image: {
            url: { type: String, default: null },
            public_id: { type: String, default: null }, // ID for cloud storage
        },

        isActive: {
            type: Boolean,
            default: true, // Toggle category visibility
        },
    },
    { timestamps: true } // Auto-adds createdAt and updatedAt
);

// Logic to auto-generate a unique slug before saving
categorySchema.pre("save", async function () {
    // Only run if name is new or changed
    if (!this.isModified("name")) return;

    const Category = mongoose.model("Category");

    // Clean name: "Men's Shoes" -> "mens-shoes"
    let baseSlug = this.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    let slug = baseSlug;
    let count = 1;

    // If slug exists, add a number: "shoes" -> "shoes-1"
    while (await Category.findOne({ slug, _id: { $ne: this._id } })) {
        slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
});

// Enforce unique index on slug
categorySchema.index({ slug: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;