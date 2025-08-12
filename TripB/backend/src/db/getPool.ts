import mysql from 'mysql2/promise';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

let pool: mysql.Pool | undefined;

const getPool = async () => {
  try {
    if (!pool) {
      const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
      });
      await connection.query(
        `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`,
      );
      pool = mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        timezone: 'Z',
      });
    }
    return pool;
  } catch (error) {
    console.error('Error getting database pool:', error);
    throw error;
  }
};

export default getPool;
