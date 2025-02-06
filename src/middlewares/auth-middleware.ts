import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { security, jwtSecurity } from '../config';

import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../classes/HttpError';

export function tokenChecker(req: any, res: Response, next: NextFunction) {
  try {
    if (!req.body['authToken']) console.log('Missing token');

    const token = req.body['authToken'];

    if (!token) {
      console.log('Token not provided', 401);
    }

    req.user = jwt.verify(token, jwtSecurity.secretKey as jwt.Secret);
    return next();
  } catch (error: any) {
    error.status = 401;
    console.log(error);
  }
}

export function apikeyChecker(req: Request, res: Response, next: NextFunction) {
  if (
    bcrypt.compareSync(req.headers.apikey as string, security.apiKey as string)
  ) {
    return next();
  }

  const error = new HttpError('You have no access', 401);
  console.log(error);
}
