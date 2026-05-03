import multer from "multer"; // Middleware for handling multipart/form-data (files)
import { CloudinaryStorage } from "multer-storage-cloudinary"; // Storage engine for Cloudinary
import cloudinary from "../config/cloudinary.js"; // Cloudinary configuration settings

// Configure how and where the files should be stored
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "categories", // Name of the folder in Cloudinary dashboard
        allowed_formats: ["jpg", "png", "jpeg", "webp"], // Restrict file types
    },
});

// Initialize multer with the Cloudinary storage settings
const upload = multer({ storage });

export default upload;