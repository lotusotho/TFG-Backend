import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecurity } from '../config';
import createError from 'http-errors';
import { UserJWT } from '../interfaces/interfaces';
import { loginQuery, saveToken } from '../services/methodsDB';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { username, password } = req.body;

  if (!username || !password) {
    const error = createError(400, 'Username and password are required');
    return next(error);
  }

  try {
    const result: any = await loginQuery(username);
    console.log('Database result:', result);

    if (!result || result.length === 0) {
      const error = createError(401, 'Invalid Credentials');
      return next(error);
    }

    console.log('User found:', result);

    const isPasswordValid = await bcrypt.compare(password, result.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      const error = createError(401, 'Invalid Credentials');
      return next(error);
    }

    const data: UserJWT = {
      id: result.id,
      username: result.username,
      isverified: result.isVerified,
      type: result.type,
    };

    const secretKey = jwtSecurity.secretKey;

    if (!secretKey) {
      console.log('Secret key is not defined');
      return next(createError(500, 'Internal Server Error'));
    }

    const token = jwt.sign(
      data,
      secretKey as string,
      {
        expiresIn: jwtSecurity.expirationTime,
      } as jwt.SignOptions
    );

    await saveToken(username, token);
    console.log('The token is: ', token);
    return res.status(200).send({ authToken: token });
  } catch (error) {
    return next(error);
  }
};
