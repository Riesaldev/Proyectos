import getPool from "../../database/getPool.js";


const selectUserByEmailService = async (email) => {

    const pool = await getPool();

    const [user] = await pool.query(`
        SELECT u.id, c.password, u.role
        FROM users u, credential c
        WHERE u.email = ?
    `,[email]);

    return user[0];
}

export default selectUserByEmailService;