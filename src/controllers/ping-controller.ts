import { Request, Response, NextFunction } from 'express';

export const pingController = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send({ message: 'pong' });
};
