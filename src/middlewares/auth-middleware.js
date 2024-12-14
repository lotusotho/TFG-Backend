import { security } from '../config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecurity } from '../config.js';

export function tokenChecker(req, res, next) {
  try {
    if (!req.headers.authorization) throw Error('Missing token');
    const [_bearer, token] = req.headers.authorization.split(' ');
    req.user = jwt.verify(token, jwtSecurity.secretKey);
    return next();
  } catch (error) {
    error.status = 401;
    throw error;
  }
}

export function apikeyChecker(req, res, next) {
  if (bcrypt.compareSync(req.headers.apikey, security.apiKey)) {
    return next();
  }

  const error = new Error('You have no access');
  error.status = 401;
  throw error;
}
