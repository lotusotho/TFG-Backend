import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecurity } from '../config';
import { HttpError } from '../classes/HttpError';
import { UserJWT } from '../interfaces/interfaces.js';
import { getToken, loginQuery, saveToken } from '../services/methodsDB.js';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { username, password } = req.body;

  if (!username || !password) {
    const error = new HttpError('Username and password are required', 400);
    return next(error);
  }

  try {
    const result: any = await loginQuery(username);
    console.log('Database result:', result);

    if (!result || result.length === 0) {
      const error = new HttpError('Invalid Credentials', 401);
      return next(error);
    }

    console.log('User found:', result);

    const isPasswordValid = await bcrypt.compare(password, result.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      const error = new HttpError('Invalid Credentials', 401);
      return next(error);
    }

    const data: UserJWT = {
      id: result.id,
      username: result.username,
      email: result.email,
      type: result.type,
    };

    const secretKey = jwtSecurity.secretKey;

    if (!secretKey) {
      throw new Error('Secret key is not defined');
    }

    const token = jwt.sign(data, secretKey, {
      expiresIn: jwtSecurity.expirationTime as string,
    });

    res.cookie('authToken', token, {
      domain: 'localhost',
      path: '/',
      httpOnly: false,
      secure: false,
      maxAge: 3600 * 1000, // 1 hora
    });

    await saveToken(username, token);
    console.log('The token is: ', await getToken(username));
    return res.status(200).send({ message: 'Login successful' });
  } catch (error) {
    return next(error);
  }
};
