import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../classes/HttpError.js';

export async function ChangeToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const authHearer = req.headers.authorization as string;
  if (!authHearer) {
    return null;
  }

  return authHearer?.split(' ')[1];
}
