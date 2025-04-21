import bcrypt from 'bcrypt';
import 'dotenv/config';

const {
    MYSQL_ADMIN_USER,
    MYSQL_ADMIN_PASSWORD,
    MYSQL_ADMIN_EMAIL,
} = process.env;

import { getPool } from './getPool.js';

const initDb = async () => {
    try
    {
        const pool = await getPool();

        console.log( 'Borrando base de datos...' );

        await pool.query(
            'DROP TABLE IF EXISTS users, profiles, films, watchlist'
        );
        console.log( 'Base de datos borrada correctamente' );

        console.log( 'Creando base de datos...' );

        await pool.query( `
            CREATE TABLE IF NOT EXISTS users(
                userId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                userName VARCHAR(40) DEFAULT 'User' ,
                email VARCHAR(50) NOT NULL,
                password VARCHAR(100) NOT NULL,
                profiles TEXT DEFAULT NULL,
                regCode CHAR(30),
                recoverPassCode CHAR(30),
                role ENUM('admin', 'normal') DEFAULT 'normal' NOT NULL,
                active BOOLEAN DEFAULT FALSE,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP 
            )
        `);

        await pool.query( `
            CREATE TABLE IF NOT EXISTS profiles(
                profileId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                profileName VARCHAR(40) NOT NULL,
                userId INT UNSIGNED NOT NULL, -- Agrega la columna userId
                avatar VARCHAR(100) DEFAULT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(userId) -- Ajusta la relación con users
            )
        `);

        await pool.query( `
            CREATE TABLE IF NOT EXISTS films(
                filmId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(40) NOT NULL,
                description TEXT NOT NULL,
                Trailer VARCHAR(40) NOT NULL,
                image VARCHAR(40) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP 
            )
        `);

        await pool.query( `
            CREATE TABLE IF NOT EXISTS watchlist(
                listId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                userId INT UNSIGNED NOT NULL,
                filmId INT UNSIGNED NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(userId),
                FOREIGN KEY (filmId) REFERENCES films(filmId),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP 
            )
        `);
        console.log( 'Base de datos creada correctamente' );

        const hashedPassword = await bcrypt.hash( `${ MYSQL_ADMIN_PASSWORD }`, 10 );

        await pool.query( `
            INSERT INTO users (userName, email, password, role, active)
            VALUES (?, ?, ?, ?, ?)
        `, [
            `${ MYSQL_ADMIN_USER }`,
            `${ MYSQL_ADMIN_EMAIL }`,
            hashedPassword,
            'admin',
            true,
        ] );
        console.log( 'Usuario admin creado correctamente' );

        process.exit( 0 );
    } catch ( error )
    {
        console.error( 'Error al inicializar la base de datos:', error );
        process.exit( 1 );
    }
};

initDb();

