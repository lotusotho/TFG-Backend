import jwt from 'jsonwebtoken';
import { jwtSecurity } from '../config';
import chalk from 'chalk';

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
    throw new Error('Token is blacklisted');
  }
  const validatedToken = jwt.verify(token, jwtSecurity.secretKey as string);
  invalidateToken(
    validatedToken as string,
    chalk.bgGreenBright('email verification')
  );

  return validatedToken;
};

export const invalidateToken = (token: string, comingFrom: string) => {
  tokenBlacklist.push(token);

  console.log('New token invalidated coming from: ', comingFrom);
};
