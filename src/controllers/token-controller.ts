import { NextFunction, Request, Response } from 'express';
import { getUserByToken } from '../services/methodsDB';

export const tokenUsernameController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers.authorization;

  const token = authHeader?.split(' ')[1];

  const user = await getUserByToken(token as string);

  return res.status(200).send({ username: user?.username });
};
