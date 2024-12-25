import { Request, Response, NextFunction } from 'express';

export const userPageController = (
  req: any,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user;
  res.send({
    message: `Welcome to ${user.username}'s page`,
    user,
  });
};
