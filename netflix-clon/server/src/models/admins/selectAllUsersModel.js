import { getPool } from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectAllUsersModel = async (
    userId,
    userName,
    email,
) => {
    const pool = await getPool();
    let query = `
    SELECT 
        userId, 
        userName, 
        email, 
        active,
        createdAt
    FROM users`;
    const params = [];
    const conditions = [];

    if ( userId )
    {
        conditions.push( 'userId = ?' );
        params.push( userId );
    }

    if ( userName )
    {
        conditions.push( 'userName LIKE ?' );
        params.push( `%${ userName }%` );
    }


    if ( email )
    {
        conditions.push( 'email LIKE ?' );
        params.push( `%${ email }%` );
    }

    if ( conditions.length > 0 )
    {
        query += ` WHERE ${ conditions.join( ' AND ' ) }`;
    }

    query += ` ORDER BY createdAt DESC`;

    const [ users ] = await pool.query( query, params );

    if ( users.length < 1 )
    {
        throw generateErrorUtil( 'No se encontraron usuarios.', 404 );
    }

    return users;
};

export default selectAllUsersModel;