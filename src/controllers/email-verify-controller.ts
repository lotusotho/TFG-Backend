import { Request, Response, NextFunction } from 'express';
import { generateToken, verifyToken } from '../utils/jwtUtils';
import { sendEmail } from '../utils/emailSender';
import config from '../config.js';
import { getUserByEmail, verifyUserByEmail } from '../services/methodsDB.js';

export const sendVerificationEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const token = generateToken({ email });
  const verificationLink = `${config.FRONTEND_URL}/verify-email?token=${token}`;

  try {
    await sendEmail(
      email,
      'Email Verification',
      `Click the link to verify your email: ${verificationLink}`
    );
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
