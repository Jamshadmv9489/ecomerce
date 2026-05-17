import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product reference is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
        min: [1, "Quantity cannot be less than 1"],
        default: 1,
    },
    price: {
        type: Number,
        required: [true, "Price at the time of adding is required"],
    }
}, { _id: false }); // Prevents generating sub-document IDs for each item

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Cart must belong to a user"],
            unique: true, // Guarantees one active cart container per user account
            index: true,
        },
        items: [cartItemSchema],
    },
    { 
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Virtual Property: Automatically calculates total price of items in the cart
cartSchema.virtual("totalPrice").get(function () {
    return this.items.reduce((total, item) => total + (item.quantity * item.price), 0);
});

// Virtual Property: Automatically calculates total count of individual pieces
cartSchema.virtual("totalItems").get(function () {
    return this.items.reduce((total, item) => total + item.quantity, 0);
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
