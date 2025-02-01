import logger from '../utils/logger.js';

import { Request, Response, NextFunction } from 'express';

export function logDate(req: Request, _res: Response, next: NextFunction) {
  logger.info(`[${new Date().toISOString()}] ${req.path}`);
  next();
}

export function logMDW(req: Request, _res: Response, next: NextFunction) {
  logger.warn('middleware');
  next();
}
