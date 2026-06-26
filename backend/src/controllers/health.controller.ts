import type { Request, Response } from 'express';

export const healthCheck = (_: Request, res: Response) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
  });
};
