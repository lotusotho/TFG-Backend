import jwt from 'jsonwebtoken';
import { jwtSecurity } from '../config';
import createError from 'http-errors';

const tokenBlacklist: string[] = [];

export const generateToken = (data: object) => {
  return jwt.sign(
    data,
    jwtSecurity.secretKey as string,
    {
      expiresIn: jwtSecurity.expirationTime,
    } as jwt.SignOptions
  );
};

export const verifyToken = (token: string) => {
  if (tokenBlacklist.includes(token)) {
    throw createError(403, 'The token has already been validated');
  }
  const validatedToken = jwt.verify(token, jwtSecurity.secretKey as string);
  invalidateToken(token as string, 'email verification');

  return validatedToken;
};

export const invalidateToken = (token: string, comingFrom: string) => {
  tokenBlacklist.push(token);

  console.log('New token invalidated coming from: ', comingFrom);
};
