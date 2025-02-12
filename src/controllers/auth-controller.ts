import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../classes/HttpError.js';

export async function ChangeToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHearer = req.headers.authorization as string;
  if (!authHearer) {
    throw new HttpError('No authorization token provided', 401);
  }

  return authHearer?.split(' ')[1];
}
