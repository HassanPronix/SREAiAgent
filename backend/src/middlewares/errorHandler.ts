import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.js";


export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {


  logger.error(
    {
      event: "http_request_failed",

      requestId: req.requestId,

      traceId: req.traceId,

      err,

      metadata: {

        component:
          "express-error-handler",

        incidentType:
          "HTTP_REQUEST_FAILURE",


        request: {

          method: req.method,

          url: req.originalUrl,

          ip: req.ip,

        }

      }

    },

    "Unhandled application error"
  );



  res.status(500).json({

    success: false,

    requestId: req.requestId,

    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message
  });

};