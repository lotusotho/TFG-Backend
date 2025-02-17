import { NextFunction, Request, Response } from 'express';
import { deleteToken } from '../services/methodsDB';
import { ChangeToken } from './auth-controller.js';
import { invalidateToken } from '../utils/jwtUtils.js';
import chalk from 'chalk';

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = await ChangeToken(req, res, next);

    await deleteToken(token as string);

    invalidateToken(token, chalk.bgRedBright('logging out'));
    return res
      .status(200)
      .send({ message: 'Token has been deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
