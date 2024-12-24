import { NextFunction, Request, Response } from 'express';
import { getUsernameByToken } from '../services/methodsDB.js';

export const tokenUsernameController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies.authToken;

  const username = await getUsernameByToken(token);

  return res.status(200).send({ username });
};
