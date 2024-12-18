import jwt from 'jsonwebtoken';
import { jwtSecurity } from '../config.js';

import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../classes/HttpError.js';

export function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
    if (!secretKey) {
      throw new Error('Secret key is not defined');
    }
    const token = jwt.sign(data, secretKey, {
      expiresIn: jwtSecurity.expirationTime,
    });

    return res.send({ token });
  }

  const error = new HttpError('Invalid Credentials', 401);
  throw error;
}

// export function newLoginController(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   if (!result) {
//     const error = new Error();
//     throw error;
//   }

//   if (bcrypt.compare(password, result[0].password)) {
//   }
// }
