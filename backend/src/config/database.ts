import mongoose from "mongoose";
import { logger } from "./logger.js";

export async function connectDB(): Promise<void> {
  try {
    const uri =
      process.env.MONGO_URI || "mongodb://localhost:27017/SREAiOps";

    await mongoose.connect(uri);
    console.log('connected to DB')

    logger.info("MongoDB connected");
  } catch (error) {
    logger.error(error, "MongoDB connection failed");
    process.exit(1);
  }
}