import { HttpError } from '../classes/HttpError';
import { User } from '../interfaces/interfaces';
import { createUser, loginQuery } from '../services/methodsDB';
import encryptPasswords from '../utils/bcryptEncryptor';

import { Request, Response, NextFunction } from 'express';

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password, type } = req.body;

  if (!username || !email || !password || !type) {
    res.status(400).send({ error: 'All fields are required.' });
  }

  try {
    const hashedPassword = await encryptPasswords(password);
    await createUser(username, email, hashedPassword, type);
    res.status(201).send({ message: 'A new user has been created' });
  } catch (error) {
    next(error);
  }
};
