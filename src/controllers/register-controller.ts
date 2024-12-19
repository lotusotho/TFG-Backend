import { HttpError } from '../classes/HttpError.js';
import { User } from '../interfaces/interfaces.js';
import { createUser, loginQuery } from '../services/methodsDB.js';
import encryptPasswords from '../utils/bcryptEncryptor.js';

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
    const doesUserExists = (await loginQuery(username)) as Array<User>;
    const doesEmailExists = (await loginQuery(email)) as Array<User>;
    if (doesUserExists.length !== 0 || doesEmailExists.length !== 0) {
      const error = new HttpError('User already exists', 400);
      return next(error);
    }

    const hashedPassword = await encryptPasswords(password);
    await createUser(username, email, hashedPassword, type);
    res.status(201).send({ message: 'A new user has been created' });
  } catch (error) {
    next(error);
  }
};
