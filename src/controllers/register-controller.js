import { createUser } from '../models/methodsDB.js';
import encryptPasswords from '../utils/bcryptEncryptor.js';

export async function registerController(req, res, next) {
  const { username, email, password, type } = req.body;

  if (!username || !email || !password || !type) {
    return res.status(400).send({ error: 'All fields are required.' });
  }

  try {
    const hashedPassword = await encryptPasswords(password);

    const newUser = {
      username: username,
      email: email,
      password: hashedPassword,
      type: type,
    };

    createUser(newUser.username, newUser.email, newUser.password, newUser.type);
    res.status(201).send({ message: 'A new user has been created' });
  } catch (error) {
    next(error);
  }
}
