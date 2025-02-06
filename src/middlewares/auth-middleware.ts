import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { security, jwtSecurity } from '../config';

import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../classes/HttpError';

export function tokenChecker(req: any, res: Response, next: NextFunction) {
  try {
    if (!req.cookies.authToken) throw Error('Missing token');

    const token = req.cookies.authToken;

    if (!token) {
      throw new HttpError('Token not provided', 401);
    }

    req.user = jwt.verify(token, jwtSecurity.secretKey as jwt.Secret);
    return next();
  } catch (error: any) {
    error.status = 401;
    throw error;
  }
}

export function apikeyChecker(req: Request, res: Response, next: NextFunction) {
  if (
    bcrypt.compareSync(req.headers.apikey as string, security.apiKey as string)
  ) {
    return next();
  }

  const error = new HttpError('You have no access', 401);
  throw error;
}
