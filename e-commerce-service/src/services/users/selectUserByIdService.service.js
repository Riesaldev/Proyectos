import getPool from "../../database/getPool.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";
const selectUserByIdService = async (userId) => {

    const pool = await getPool();

    const [user] = await pool.query(`
        SELECT id, name, email, address, phone
        FROM users
        WHERE id = ?
    `,[userId]);

    if(user.length === 0) throw generateErrorUtils('Usuario no existe', 404);

    return user[0];
}

export default selectUserByIdService;