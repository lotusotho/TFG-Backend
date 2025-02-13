import { Request, Response, NextFunction } from 'express';
import { generateToken, verifyToken } from '../utils/jwtUtils';
import { sendEmail } from '../utils/emailSender';
import encryptPasswords from '../utils/bcryptEncryptor';
import config from '../config.js';
import { updateUserPassword } from '../services/methodsDB.js';

export const sendPasswordResetEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const token = generateToken({ email });
  const resetLink = `${config.FRONTEND_URL}/reset-password?token=${token}`;

  await sendEmail(
    email,
    'Password Reset',
    `Click the link to reset your password: ${resetLink}`
  );
  res.status(200).send({ message: 'Password reset email sent' });
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, newPassword } = req.body;

  try {
    const decoded: any = verifyToken(token as string);
    const hashedPassword = await encryptPasswords(newPassword);
    await updateUserPassword(decoded.email, hashedPassword);
    res.status(200).send({ message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
};
