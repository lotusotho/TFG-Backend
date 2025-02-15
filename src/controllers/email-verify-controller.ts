import { Request, Response, NextFunction } from 'express';
import { generateToken, verifyToken } from '../utils/jwtUtils';
import { sendRegisterVerificationEmail } from '../services/emailSender';
import config from '../config.js';
import {
  getUserByEmail,
  getUserByToken,
  verifyUserByEmail,
} from '../services/methodsDB.js';
import { ChangeToken } from './auth-controller.js';

export const sendVerificationEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username } = req.body;
  const token = generateToken({ email });
  const verificationLink = `${config.FRONTEND_URL}/verify-email?token=${token}`;

  try {
    await sendRegisterVerificationEmail(email, username, verificationLink);
    res.status(200).send({ message: 'Verification email sent' });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.query;

  try {
    const decoded: any = verifyToken(token as string);
    const user = await getUserByEmail(decoded.email);
    if (user) {
      await verifyUserByEmail(user.email);
      res.status(200).send({ message: 'Email verified successfully' });
    } else {
      res.status(400).send({ error: 'Invalid token' });
    }
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(400).send({ error: 'Token expired' });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(400).send({ error: 'Invalid token' });
    } else {
      next(error);
    }
  }
};

export const isUserVerifiedByTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Extract token from the Authorization header or query parameters
    const token = await ChangeToken(req, res, next);

    if (!token) {
      return res.status(401).send({ error: 'Token not provided' });
    }

    const user = await getUserByToken(token);
    if (user) {
      return res.status(200).send({ verified: user.isVerified });
    } else {
      return res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};
