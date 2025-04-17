import nodemailer from 'nodemailer';
import generateErrorUtil from './generateErrorUtil.js';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

const transport = nodemailer.createTransport( {
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
} );

const sendEmailUtil = async ( email, subject, body ) => {
    try
    {
        await transport.sendMail( {
            from: SMTP_USER,
            to: email,
            subject,
            text: body,
        } );
    } catch ( err )
    {
        console.error( err );
        throw generateErrorUtil( 'Error al enviar el email', 500 );
    }
};

export default sendEmailUtil;