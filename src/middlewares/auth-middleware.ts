import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecurity } from '../config';

import { Response, NextFunction } from 'express';

export async function tokenChecker(
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers['Authorization'];
    if (!authHeader) {
      res.status(401).json({ error: 'Missing Authorization header' });
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Token not provided' });
      return;
    }

    req.user = jwt.verify(token, jwtSecurity.secretKey as jwt.Secret);
    next();
  } catch (error: any) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// export async function apikeyChecker(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   if (
//     bcrypt.compareSync(req.headers.apikey as string, security.apiKey as string)
//   ) {
//     return next();
//   }

//   res.status(401).json({ error: 'You have no access' });
// }
