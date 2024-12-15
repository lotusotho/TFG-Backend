import jwt from 'jsonwebtoken';
import { jwtSecurity } from '../config.js';

export function loginController(req, res, next) {
  const {
    username: adminUsername,
    password: adminPassword,
    secretKey,
  } = jwtSecurity;
  const { username, password } = req.body;

  if (username === adminUsername && password === adminPassword) {
    const data = {
      username,
      role: 'admin',
    };
    const token = jwt.sign(data, secretKey, {
      expiresIn: jwtSecurity.expirationTime,
    });

    return res.send({ token });
  }

  const error = new Error('Invalid Credentials');
  error.status = 401;
  throw error;
}

export function newLoginController(req, res, next) {
  if (!result) {
    const error = new Error();
    throw error;
  }

  if (bcrypt.compare(password, result[0].password)) {
  }
}
