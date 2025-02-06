import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { security, jwtSecurity } from '../config';

import { Request, Response, NextFunction } from 'express';

export async function tokenChecker(
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.body['authToken']) {
      res.status(401).json({ error: 'Missing token' });
      return;
    }

    const token = req.body['authToken'];

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
