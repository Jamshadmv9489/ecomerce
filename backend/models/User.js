import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "User name is required"],
            trim: true,
        },
        username: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
            required: [true, "Username is required"], // Added required to guarantee uniqueness constraint enforcement
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false,
        },
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        // 🔒 OTP Fields added for Forgot Password Feature
        otp: {
            type: String,
            default: null,
            select: false, // Security: Hides OTP from normal queries
        },
        otpExpires: {
            type: Date,
            default: null,
            select: false,
        },
    },
    { timestamps: true }
);

// Middleware: Hash password using Bcrypt
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});

// Method: Compare entered password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method: Compare entered OTP with stored hashed OTP
userSchema.methods.compareOTP = async function (candidateOtp) {
    return await bcrypt.compare(candidateOtp, this.otp);
};

const User = mongoose.model("User", userSchema);
export default User;
