import { getPool } from "../../db/getPool.js";

const deleteProfileModel = async ( profileId, userId ) => {
    const pool = await getPool();

    const [ result ] = await pool.query(
        `DELETE FROM profiles WHERE profileId = ? AND userId = ?`,
        [ profileId, userId ]
    );

    return result.affectedRows > 0;
};

export default deleteProfileModel;
