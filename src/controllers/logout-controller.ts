import { NextFunction, Request, Response } from 'express';
import { deleteToken } from '../services/methodsDB';

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    await deleteToken(token as string);

    return res
      .status(200)
      .send({ message: 'Token has been deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
