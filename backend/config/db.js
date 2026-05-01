import mongoose from "mongoose";

// Connect to DB
const connectDB = async () => {
  try {
    // Connect using URI
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Success log
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Error log
    console.error(`Error: ${error.message}`);

    // Exit on failure
    process.exit(1);
  }
};

// Export function
export default connectDB;