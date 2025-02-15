import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../classes/HttpError.js';

export async function ChangeToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<string | null> {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'No authorization token provided' });
    return null;
  }
  return authHeader.split(' ')[1];
}
