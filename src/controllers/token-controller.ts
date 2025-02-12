import { NextFunction, Request, Response } from 'express';
import { getUserByToken } from '../services/methodsDB';
import { ChangeToken } from './auth-controller.js';

export const tokenUsernameController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = await ChangeToken(req, res, next);

  const user = await getUserByToken(token as string);

  return res.status(200).send({ username: user?.username });
};
