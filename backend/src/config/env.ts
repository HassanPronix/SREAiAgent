import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5000),

  mongoUri: process.env.MONGO_URI!,

  kafkaBrokers:
    process.env.KAFKA_BROKERS?.split(",") || ["localhost:9092"],

  qdrantUrl: process.env.QDRANT_URL!,

  nodeEnv: process.env.NODE_ENV || "development",

  serviceName: process.env.SERVICE_NAME || "api-service",

  logLevel: process.env.LOG_LEVEL || "info",
};