import crypto from 'crypto';
import bcrypt from 'bcrypt';

import { getPool } from '../../db/getPool.js';

import sendMailUtil from '../../utils/sendEmailUtil.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const insertUserModel = async ( email, password ) => {
    const pool = await getPool();

    let [ users ] = await pool.query(
        `SELECT userId FROM users WHERE email = ?`,
        [ email ],
    );

    if ( users.length > 0 )
    {
        throw generateErrorUtil( 'Email ya en uso', 409 );
    }

    const regCode = crypto.randomBytes( 15 ).toString( 'hex' );
    const hashedPass = await bcrypt.hash( password, 10 );
    const now = new Date();

    const [ result ] = await pool.query(
        `INSERT INTO users (email, password, regCode, createdAt) VALUES (?, ?, ?, ?)`,
        [ email, hashedPass, regCode, now ],
    );

    const emailSubject = 'Activa tu usuario en Netflix';
    const emailBody = `
        Bienvenid@ a Netflix ${ email }!

        Gracias por registrarte en nuestra plataforma. Para activar tu cuenta, por favor haz click en el siguiente enlace:

        ${ process.env.CLIENT_URL }/validate/${ regCode }

        Una vez validado, serás redirigido a la página de inicio de sesión.
    `;

    console.log( 'Enviando correo a:', email );

    await sendMailUtil( email, emailSubject, emailBody );

    return result.insertId;
};

export default insertUserModel;