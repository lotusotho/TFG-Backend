import jwt from 'jsonwebtoken';
import { jwtSecurity } from '../config';

import { Response, NextFunction } from 'express';
import { ChangeToken } from '../controllers/auth-controller.js';

export async function tokenChecker(
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = await ChangeToken(req, res, next);

    if (!token) {
      res.status(401).json({ error: 'Token not provided' });
      return;
    }

    req.user = jwt.verify(token, jwtSecurity.secretKey as jwt.Secret);
    next();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// export function apikeyChecker(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void {
//   if (
//     bcrypt.compareSync(req.headers.apikey as string, security.apiKey as string)
//   ) {
//     next();
//     return;
//   }

//   res.status(401).json({ error: 'You have no access' });
// }
