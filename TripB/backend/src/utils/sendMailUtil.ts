import nodemailer from 'nodemailer';
import generateErrorUtil from './generateErrorUtil.ts';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

const sendMailUtil = async ( email: string, subject: string, body: string) => {
  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to: email,
      subject,
      text: body,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    generateErrorUtil('Error sending email', 500);
  }
};

export default sendMailUtil;
