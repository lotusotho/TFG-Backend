import nodemailer from 'nodemailer';
import mailgunTransport from 'nodemailer-mailgun-transport';
import { emailConfig } from '../config.js';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mailgunOptions = {
  auth: {
    api_key: emailConfig.MAILGUN_API_KEY || '',
    domain: emailConfig.MAILGUN_DOMAIN || '',
  },
};

const transporter = nodemailer.createTransport(
  mailgunTransport(mailgunOptions)
);

const readHTMLFile = (filePath: string) => {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};

export const sendEmail = async (
  to: string,
  subject: string,
  templateName: string,
  templateData: object
) => {
  const templatePath = path.join(
    __dirname,
    'templates',
    `${templateName}.html`
  );
  const html = await readHTMLFile(templatePath);
  const template = handlebars.compile(html);
  const htmlToSend = template(templateData);

  const mailOptions = {
    from: emailConfig.MAILGUN_EMAIL,
    to,
    subject,
    html: htmlToSend,
  };

  await transporter.sendMail(mailOptions);
};

export const sendForgotPasswordEmail = async (
  to: string,
  name: string,
  resetLink: string
) => {
  await sendEmail(to, 'Recuperar Contraseña', 'forgotPassword', {
    name,
    resetLink,
  });
};

export const sendRegisterVerificationEmail = async (
  to: string,
  name: string,
  confirmationLink: string
) => {
  await sendEmail(to, 'Confirmar Registro', 'confirmRegistration', {
    name,
    confirmationLink,
  });
};
