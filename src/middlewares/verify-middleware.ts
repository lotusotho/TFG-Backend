import { Request, Response, NextFunction } from 'express';
import { getUserByToken } from '../services/methodsDB';
import { ChangeToken } from '../controllers/auth-controller.js';

export async function verifyUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const token = await ChangeToken(req, res, next);
  if (!token) {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }

  const user = await getUserByToken(token);
  if (!user) {
    return res
      .status(401)
      .json({ error: 'Token inválido o usuario inexistente' });
  }

  if (!user.isVerified) {
    return res.status(403).json({ error: 'El usuario no está verificado' });
  }

  (req as any).user = user;
  next();
}
