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
        event: "database_connected",

        metadata: {
          component: "mongodb",
          database: "mongodb",
          host: mongoose.connection.host,
          name: mongoose.connection.name
        }
      },

      "MongoDB connected"
    );


  } catch (error) {


    logger.error(
      {
        event: "database_connection_failed",

        err: error,

        metadata: {
          component: "mongodb",
          incidentType: "DATABASE_CONNECTION_FAILURE",
          database: "mongodb",
          host: uri.replace(
            /\/\/.*@/,
            "//[REDACTED]@"
          )
        }
      },

      "MongoDB connection failed"
    );


    process.exit(1);
  }
}