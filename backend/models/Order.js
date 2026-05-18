import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product reference is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
        min: [1, "Quantity cannot be less than 1"],
    },
    price: {
        type: Number,
        required: [true, "Price at the time of purchase is required"],
    }
}, { _id: false }); // Prevents generating sub-document IDs for each item row

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Order must belong to a user"],
            index: true,
        },
        items: [orderItemSchema],
        shippingAddress: {
            street: { type: String, required: [true, "Street address is required"] },
            city: { type: String, required: [true, "City is required"] },
            state: { type: String, required: [true, "State is required"] },
            postalCode: { type: String, required: [true, "Postal code is required"] },
            country: { type: String, required: [true, "Country is required"] },
            phone: { type: String, required: [true, "Contact phone number is required"] }
        },
        paymentMethod: {
            type: String,
            required: [true, "Payment method is required"],
            enum: ["COD", "Razorpay", "Stripe"],
            default: "COD"
        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            updateTime: { type: String },
        },
        itemsPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false
        },
        paidAt: {
            type: Date
        },
        orderStatus: {
            type: String,
            required: true,
            enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Processing"
        },
        deliveredAt: {
            type: Date
        }
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
