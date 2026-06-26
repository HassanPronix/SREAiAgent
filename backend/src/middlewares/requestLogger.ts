import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.js';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    const logPayload = {
      event: 'http_request_completed',

      requestId: req.requestId,

      traceId: req.traceId,

      metadata: {
        method: req.method,

        path: req.originalUrl,

        statusCode: res.statusCode,

        duration,
      },
    };

    if (res.statusCode >= 500) {
      logger.error(
        {
          ...logPayload,

          event: 'http_request_failed',
        },

        'HTTP request failed',
      );
    } else if (res.statusCode >= 400) {
      logger.warn(
        {
          ...logPayload,

          event: 'http_request_warning',
        },

        'HTTP request warning',
      );
    } else {
      logger.info(
        logPayload,

        'HTTP request completed',
      );
    }
  });

  next();
};
