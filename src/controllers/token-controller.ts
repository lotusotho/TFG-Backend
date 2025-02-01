import { NextFunction, Request, Response } from 'express';
import { getUserByToken } from '../services/methodsDB';

export const tokenUsernameController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies.authToken;

  const user = await getUserByToken(token);

  return res.status(200).send({ username: user.username });
};
