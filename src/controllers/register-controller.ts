import { createUser } from '../services/methodsDB.js';
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
    const hashedPassword = await encryptPasswords(password);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      type,
    };

    createUser(newUser.username, newUser.email, newUser.password, newUser.type);
    res.status(201).send({ message: 'A new user has been created' });
  } catch (error) {
    next(error);
  }
};
