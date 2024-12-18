import { Request, Response, NextFunction } from 'express';

export function registrationValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;

  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

  if (!regex.test(email)) {
    res.status(500).send({ error: 'Introduce un email válido' });
  } else {
    return next();
  }
}
