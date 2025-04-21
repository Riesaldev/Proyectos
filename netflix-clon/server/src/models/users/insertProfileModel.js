import { getPool } from "../../db/getPool.js";

const insertProfileModel = async ( userId, profileName, avatar = null ) => {
    const pool = await getPool();
    const now = new Date();

    const [ result ] = await pool.query(
        `INSERT INTO profiles (userId, profileName, avatar, createdAt) VALUES (?, ?, ?, ?)`,
        [ userId, profileName, avatar, now ]
    );

    return result.insertId;
};

export default insertProfileModel;
