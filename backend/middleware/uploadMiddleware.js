import multer from "multer"; // Middleware for handling multipart/form-data (files)
import { CloudinaryStorage } from "multer-storage-cloudinary"; // Storage engine for Cloudinary
import cloudinary from "../config/cloudinary.js"; // Cloudinary configuration settings

const createUpload = (folderName) => {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            // Set dynamic folder path in Cloudinary
            folder: `ecommerce/${folderName}`, 
            // Restrict file types to common image formats
            allowed_formats: ["jpg", "png", "jpeg", "webp"],
        },
    });

    // Return multer instance with Cloudinary storage config
    return multer({ storage });
};

export default createUpload;