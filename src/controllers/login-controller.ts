import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginQuery } from '../services/methodsDB';
import { jwtSecurity } from '../config';
import { HttpError } from '../classes/HttpError';
import { UserJWT } from '../interfaces/interfaces.js';

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

    const user = result[0];
    console.log('User found:', user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      const error = new HttpError('Invalid Credentials', 401);
      return next(error);
    }

    const data: UserJWT = {
      id: user.id,
      username: user.username,
      email: user.email,
      type: user.type,
    };

    const secretKey = jwtSecurity.secretKey;

    if (!secretKey) {
      throw new Error('Secret key is not defined');
    }

    const token = jwt.sign(data, secretKey, {
      expiresIn: jwtSecurity.expirationTime as string,
    });

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true, // Asegúrate de que tu servidor esté usando HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    return res.status(200).send({ message: 'Login successful' });
  } catch (error) {
    return next(error);
  }
};
