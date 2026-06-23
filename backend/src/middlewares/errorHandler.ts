import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  logger.error({
    requestId: req.requestId,
    traceId: req.traceId,
    error: err.message,
    stack: err.stack,
  });

  res.status(500).json({
    success: false,
    requestId: req.requestId,
    message: "Internal Server Error",
  });
};