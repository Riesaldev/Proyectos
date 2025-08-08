import getPool from '../../database/getPool.js';
import generateErrorUtils from '../../utils/generateErrorUtils.js';
import bcrypt from 'bcrypt';

const insertUserService = async (email, password) => {

    const pool = await getPool();

    const [user] = await pool.query(`
        SELECT id FROM users WHERE email=?
    `,[email]);

    if(user.length) throw generateErrorUtils('El email ya se encuentra registrado.', 409);

    const passwordHashed = await bcrypt.hash(password, 10);

    const [result] = await pool.query(`
        INSERT INTO users (email)
        VALUES (?)
    `,[email]);
    
    const { insertId } = result;

    await pool.query(`
        INSERT INTO credential (password, userId)
        VALUES (?,?)
    `,[passwordHashed, insertId]);

    return;
}

export default insertUserService;