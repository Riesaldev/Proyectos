import { detPool } from '../utils/detPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const updateUserModel = async ( {
    firstName,
    lastName,
    username,
    email,
    userId,
} ) => {
    const pool = await detPool();

    try
    {
        // Verificar si el username ya está en uso por otro usuario
        if ( username && username.trim() !== '' )
        {
            const [ usersWithUsername ] = await pool.query(
                `SELECT userId FROM users WHERE username = ? AND userId != ?`,
                [ username.trim(), userId ],
            );

            if ( usersWithUsername.length > 0 )
            {
                throw generateErrorUtil( 'Nombre de usuario no disponible', 409 );
            }
        }

        // Verificar si el email ya está en uso por otro usuario
        if ( email && email.trim() !== '' )
        {
            const [ usersWithEmail ] = await pool.query(
                `SELECT userId FROM users WHERE email = ? AND userId != ?`,
                [ email.trim(), userId ],
            );

            if ( usersWithEmail.length > 0 )
            {
                throw generateErrorUtil( 'Email no disponible', 409 );
            }
        }

        const updates = [];
        const params = [];

        if ( firstName && firstName.trim() !== '' )
        {
            updates.push( 'firstName = ?' );
            params.push( firstName.trim() );
        }

        if ( lastName && lastName.trim() !== '' )
        {
            updates.push( 'lastName = ?' );
            params.push( lastName.trim() );
        }

        if ( username && username.trim() !== '' )
        {
            updates.push( 'username = ?' );
            params.push( username.trim() );
        }

        if ( email && email.trim() !== '' )
        {
            updates.push( 'email = ?' );
            params.push( email.trim() );
        }

        if ( updates.length === 0 )
        {
            throw generateErrorUtil( 'No se proporcionaron campos para actualizar.', 400 );
        }

        updates.push( 'updatedAt = ?' );
        params.push( new Date() );
        params.push( userId );

        const query = `UPDATE users SET ${ updates.join( ', ' ) } WHERE userId = ?`;

        console.log( 'Consulta SQL:', query );
        console.log( 'Parámetros:', params );

        const [ result ] = await pool.query( query, params );
        console.log( 'Resultado de la consulta:', result );

    } catch ( error )
    {
        console.error( 'Error al actualizar el usuario:', error );
        throw generateErrorUtil( 'Error al actualizar el usuario', 500 );
    }
};

export default updateUserModel;