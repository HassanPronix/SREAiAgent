import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.js";
import { producerService } from "../services/kafka/producer.service.js";
import { TOPICS } from "../services/kafka/topics.js";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", async () => {
    const payload = {
      timestamp: new Date().toISOString(),

      requestId: req.requestId,
      traceId: req.traceId,

      method: req.method,
      path: req.originalUrl,

      statusCode: res.statusCode,

      duration: Date.now() - start,

      service:
        process.env.SERVICE_NAME ||
        "sre-aiops-backend",
    };

    logger.info(payload);

    try {
      await producerService.publish(
        TOPICS.BACKEND_LOGS,
        payload
      );
    } catch (error) {
      logger.error(error);
    }
  });

  next();
};