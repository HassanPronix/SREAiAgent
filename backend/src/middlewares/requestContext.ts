import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      traceId: string;
    }
  }
}

export const requestContext = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  req.requestId = randomUUID();

  req.traceId =
    (req.headers["x-trace-id"] as string) ||
    randomUUID();

  next();
};