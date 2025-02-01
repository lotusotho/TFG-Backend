import { NextFunction, Request, Response } from 'express';
import { deleteToken } from '../services/methodsDB.js';

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authToken = req.cookies.authToken;
    await deleteToken(authToken);

    return res
      .status(200)
      .send({ message: 'Token has been deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
