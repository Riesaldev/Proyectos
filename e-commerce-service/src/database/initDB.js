import getPool from '../database/getPool.js';

const initDB = async () => {
    try {
        let pool = await getPool();

        console.log('Eliminando base de datos....');

        await pool.query('DROP DATABASE IF EXISTS ecommerce');

        console.log('Creando base de datos ecommerce....');
        
        await pool.query('CREATE DATABASE ecommerce');

        await pool.query('USE ecommerce');

        console.log('Creando tablas...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
	            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                name VARCHAR(50) DEFAULT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                address VARCHAR(100) DEFAULT NULL,
                phone VARCHAR(50) DEFAULT NULL,
                role ENUM('admin', 'normal') DEFAULT 'normal'
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS credential (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                password VARCHAR(100) NOT NULL,
                userId INT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS category (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL
            )
        `)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                description VARCHAR(1000) NOT NULL,
                price DECIMAL(5,2),
                stock INT,
                image VARCHAR(1000),
                categoryId INT NOT NULL,
                FOREIGN KEY (categoryId) REFERENCES category(id)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                date DATE NOT NULL,
                userId INT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS order_detail (
                orderId INT NOT NULL,
                productId INT NOT NULL,
                FOREIGN KEY (orderId) REFERENCES orders(id),
                FOREIGN KEY (productId) REFERENCES products(id)
            )
        `);

        console.log('Tablas creadas correctamente!!');

        process.exit(0);
        
        
    } catch (error) {
        console.log(error);
    }
}

initDB();