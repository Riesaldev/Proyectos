import 'dotenv/config';
import bcrypt from 'bcrypt';
import getPool from './getPool.ts';

const initDb = async () => {
  try {
    const pool = await getPool();
    console.log('Erasing old database...');
    await pool.query(
      `DROP TABLE IF EXISTS entryLikes, entryVotes, entryPhotos, entryComments, users`
    );

    console.log('Creating new database...');
    
    await pool.query(
      `CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        username VARCHAR(30) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        avatar VARCHAR(255),
        active BOOLEAN DEFAULT FALSE,
        regcode CHAR(32),
        recoverPassCode CHAR(32),
        role ENUM('user', 'admin') DEFAULT 'user',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS entryComments (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(100) NOT NULL,
        place VARCHAR(50) NOT NULL,
        description TEXT,
        content TEXT NOT NULL,
        userId INT UNSIGNED NOT NULL,
        parentCommentId INT UNSIGNED NULL,
        isAuthorComment BOOLEAN DEFAULT FALSE,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (parentCommentId) REFERENCES entryComments(id) ON DELETE CASCADE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS entryPhotos (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        entryId INT UNSIGNED NOT NULL,
        userId INT UNSIGNED NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (entryId) REFERENCES entryComments(id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )
    `); 

    await pool.query(`
      CREATE TABLE IF NOT EXISTS entryVotes (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        value TINYINT UNSIGNED NOT NULL CHECK (value BETWEEN 1 AND 5),
        entryId INT UNSIGNED NOT NULL,
        userId INT UNSIGNED NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (entryId) REFERENCES entryComments(id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_vote (entryId, userId)
      )
    `);

    console.log('Database initialized successfully');

    const hashedPass = await bcrypt.hash('admin', 10);
    await pool.query(`
      INSERT INTO users (email, username, password, avatar, active, role, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      'admin@example.com',
      'admin',
      hashedPass,
      'https://example.com/avatar.png',
      true,
      'admin',
      new Date(),
    ]);

    console.log('Admin user created successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initDb();