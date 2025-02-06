import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { security, jwtSecurity } from '../config';

import { Request, Response, NextFunction } from 'express';

export function tokenChecker(req: any, res: Response, next: NextFunction) {
  try {
    if (!req.body['authToken']) {
      return res.status(401).json({ error: 'Missing token' });
    }

    const token = req.body['authToken'];

    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    req.user = jwt.verify(token, jwtSecurity.secretKey as jwt.Secret);
    return next();
  } catch (error: any) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function apikeyChecker(req: Request, res: Response, next: NextFunction) {
  if (
    bcrypt.compareSync(req.headers.apikey as string, security.apiKey as string)
  ) {
    return next();
  }

  return res.status(401).json({ error: 'You have no access' });
}
