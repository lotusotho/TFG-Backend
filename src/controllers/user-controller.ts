import { NextFunction, Request, Response } from 'express';
import {
  deleteUnverifiedUsers,
  getUserByName,
  getUserByToken,
} from '../services/methodsDB';

export const UsernameController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const name = req.query.blog;

  const user = await getUserByName(name as string);

  return res.status(200).send({ username: user!.username });
};

export const deleteUnverifiedUsersController = async () => {
  try {
    await deleteUnverifiedUsers();

    console.log('Unverified users deleted');
  } catch (error) {
    console.error(error);
  }
};
