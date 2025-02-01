import logger from '../utils/logger.js';

import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  logger.error(`[${status}] ${err.message}`);
  res.status(status || 500).send({
    code: status,
    message: err.message,
  });
}
