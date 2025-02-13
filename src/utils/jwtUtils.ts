import jwt from 'jsonwebtoken';
import { jwtSecurity } from '../config';

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
  return jwt.verify(token, jwtSecurity.secretKey as string);
};
