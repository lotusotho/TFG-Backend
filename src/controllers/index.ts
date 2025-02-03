import { NextFunction, Request, Response } from 'express';

export const getIndexController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  res.status(200).send({ message: 'server functional' });
};
