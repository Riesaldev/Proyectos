import getPool from "../../database/getPool.js";

const updateUserService = async (userId, name, address, phone) => {
    
    const pool = await getPool();

    await pool.query(`
        UPDATE users
        SET name=?, address=?, phone=?
        WHERE id=?
    `,[name, address, phone, userId]);

    
}

export default updateUserService;