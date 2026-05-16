import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import categoryRoutes from "./routes/categoryRoute.js"; // Category API routes
import productRoutes from "./routes/productRoute.js"; // Product API routes
import authRoutes from "./routes/authRoute.js"; // Auth API routes

// Centralized error handling middleware
import { globalErrorHandler } from './middleware/errorHandler.js';

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // HTTP request logger
app.use(cookieParser()); // Parse incoming cookies and populate req.cookies

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Centralized error handler
app.use(globalErrorHandler);

// Test route
app.get("/", (req, res) => {
  res.send("Basic Ecomerce project running...");
});

// PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});