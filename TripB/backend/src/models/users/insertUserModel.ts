import crypto from "crypto";
import bcrypt from "bcrypt";
import getPool from "../../db/getPool.ts";
import sendMailUtil from "../../utils/sendMailUtil.ts";
import generateErrorUtil from "../../utils/generateErrorUtil.ts";

const insertUserModel = async (username: string, email: string, password: string) => {
  const pool = await getPool();
  
  // Tipar el resultado correctamente
  const [users] = await pool.query(
    `SELECT id FROM users WHERE username = ?`, [username]
  ) as [any[], any]; // o usa un tipo más específico

  if (Array.isArray(users) && users.length > 0) {
    generateErrorUtil('User already exists', 409);
  }

  const [emailUsers] = await pool.query(
    `SELECT id FROM users WHERE email = ?`,[email]
  ) as [any[], any];

  if (emailUsers.length > 0) {
    generateErrorUtil('Email already exists', 409);
  }

  const regCode = crypto.randomBytes(30).toString('hex');
  const hashedPass = await bcrypt.hash(password, 10);

  const now = new Date();

  await pool.query(
    `INSERT INTO users (username, email, password, regCode, createdAt) VALUES (?, ?, ?, ?, ?)`,
    [username, email, hashedPass, regCode, now]
  );

  const emailSubject = 'Please confirm your email for TripB';
  const emailBody = `
    <h1>Welcome to TripB ${username}!</h1>
    <p>Please confirm your email by clicking the link below:</p>
    <a href="${process.env.CLIENT_URL}/users/validate/${regCode}">Activate your account!!</a>
  `;

  await sendMailUtil(email, emailSubject, emailBody);
};

export default insertUserModel;