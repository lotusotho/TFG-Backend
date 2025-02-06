import { Request, Response, NextFunction } from 'express';

export const registrationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { username, email, password, type } = req.body;

  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

  if (!regex.test(email)) {
    return res.status(500).send({ error: 'Introduce un email válido' });
  }

  return next();
};
