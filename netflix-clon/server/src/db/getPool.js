import mysql from 'mysql2/promise';
import dotenv from 'dotenv';


dotenv.config();


const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DB,
    MYSQL_ADMIN_USER,
    MYSQL_ADMIN_PASSWORD,
    MYSQL_ADMIN_EMAIL,
} = process.env;

let pool;

const adminConfig = {
    user: MYSQL_ADMIN_USER,
    password: MYSQL_ADMIN_PASSWORD,
    email: MYSQL_ADMIN_EMAIL || 'admin@default.com',
};

const getPool = async () => {

    try
    {
        if ( !pool )
        {
            const dbConnection = await mysql.createConnection( {
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
            } );

            await dbConnection.query( `
                CREATE DATABASE IF NOT EXISTS ${ MYSQL_DB }
            `);

            pool = mysql.createPool( {
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                database: MYSQL_DB,
                timezone: 'Z',
            } );
        }
        return await pool;
    } catch ( error )
    {
        console.error( error );
    }
};

export { getPool, adminConfig };