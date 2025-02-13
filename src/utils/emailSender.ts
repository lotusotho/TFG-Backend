import nodemailer from 'nodemailer';
import { emailConfig } from '../config.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailConfig.EMAIL_USER,
    pass: emailConfig.EMAIL_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: emailConfig.EMAIL_USER,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
