import mongoose from "mongoose";
import { logger } from "./logger.js";


export async function connectDB(): Promise<void> {

  const uri =
    process.env.MONGO_URI ||
    "mongodb://localhost:27017/SREAiOps";


  try {

    await mongoose.connect(uri);


    logger.info(
      {
        database: "mongodb",
        host: mongoose.connection.host,
        name: mongoose.connection.name
      },
      "MongoDB connected"
    );


  } catch (error) {


    logger.error(
      {
        err: error,

        service: "database",

        component: "mongodb",

        incidentType: "DATABASE_CONNECTION_FAILURE",

        metadata: {
          database: "mongodb",
          host: uri.replace(/\/\/.*@/, "//[REDACTED]@")
        }
      },

      "MongoDB connection failed"
    );


    process.exit(1);
  }
}