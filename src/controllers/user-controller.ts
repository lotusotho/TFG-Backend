import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import {
  deleteUnverifiedUsers,
  deleteUser,
  getUserByName,
  getUserByToken,
} from '../services/methodsDB';
import { ChangeToken } from './auth-controller.js';

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

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = await ChangeToken(req, res, next);
    if (!token) {
      throw createError(401, 'Token not provided');
    }
    const user = await getUserByToken(token);
    if (!user) {
      throw createError(404, 'User not found for provided token');
    }
    const result = await deleteUser(user.ID);
    if (!result) {
      throw createError(400, 'Failed to delete user');
    }
    return res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};
