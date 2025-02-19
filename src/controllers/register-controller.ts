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
    return res.status(400).send({ error: 'All fields are required.' });
  }

  try {
    const hashedPassword = await encryptPasswords(password);
    const newUser = await createUser(
      username.toLowerCase() as string,
      email.toLowerCase() as string,
      hashedPassword as string,
      type
    );

    if (newUser === 500) {
      return res.status(500).send({ error: 'User already exists' });
    }

    return res.status(201).send({ message: 'A new user has been created' });
  } catch (error) {
    next(error);
  }
};
