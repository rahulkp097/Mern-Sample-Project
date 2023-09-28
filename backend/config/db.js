import mongoose from "mongoose";

const connectDB = async () => {
  try {
   const conn = await mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1/crud-mern");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
