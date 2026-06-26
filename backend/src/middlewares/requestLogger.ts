import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.js';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    const payload = {
      requestId: req.requestId,

      traceId: req.traceId,

      method: req.method,

      path: req.originalUrl,

      statusCode: res.statusCode,

      duration,

      service: process.env.SERVICE_NAME || 'sre-aiops-backend',
    };

    if (res.statusCode >= 500) {
      logger.error(payload, 'HTTP request failed');
    } else if (res.statusCode >= 400) {
      logger.warn(payload, 'HTTP request warning');
    } else {
      logger.info(payload, 'HTTP request completed');
    }
  });

  next();
};
