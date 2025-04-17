import { getPool } from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateUserStatusModel = async ( { userId } ) => {
    const pool = await getPool();

    const [ users ] = await pool.query(
        `SELECT userId FROM users WHERE userId = ?`,
        [ userId ],
    );

    if ( users.length < 1 )
    {
        generateErrorUtil( 'Usuario no encontrado', 404 );
    }

    const userData = users[ 0 ];
    if ( !userData )
    {
        console.log( 'Usuario no encontrado al intentar acceder a user[0].' );
        throw generateErrorUtil(
            `Usuario no encontrado en la base de datos.${ userId }`,
            404,
        );
    }
    const currentStatus = userData.active;
    const newStatus = currentStatus === 1 ? 0 : 1;

    await pool.query( `UPDATE users SET active = ? WHERE userId = ?`, [
        newStatus,
        userId,
    ] );
    return { newStatus };
};

export default updateUserStatusModel;