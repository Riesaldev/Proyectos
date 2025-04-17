import { getPool } from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const deleteUserModel = async ( userId ) => {
    const pool = await getPool();

    const [ user ] = await pool.query(
        `SELECT userId FROM users WHERE userId = ?`,
        [ userId ],
    );

    if ( user.length === 0 )
    {
        throw generateErrorUtil( 'Usuario no encontrado.', 404 );
    }

    await pool.query( `DELETE FROM users WHERE userId = ?`, [ userId ] );
};

export default deleteUserModel;