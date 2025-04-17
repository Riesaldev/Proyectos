import { getPool } from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Inicializamos el modelo.
const updateUserModel = async ( {
    userName,
    email,
    userId,
} ) => {
    const pool = await getPool();

    try
    {

        if (
            userName && userName.trim() !== '' )
        {
            const [ usersWithName ] = await pool.query(
                `SELECT userId FROM users WHERE 
                userName = ? AND userId != ?`,
                [
                    userName.trim(), userId ],
            );

            if ( usersWithName.length > 0 )
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

        // Construir la consulta dinámica para actualizar los campos proporcionados
        const updates = [];
        const params = [];

        if (
            userName &&
            userName.trim() !== '' )
        {
            updates.push( 'userName = ? ' );
            params.push(
                userName.trim() );
        }

        if ( email && email.trim() !== '' )
        {
            updates.push( 'email = ?' );
            params.push( email.trim() );
        }

        // Si no hay campos para actualizar, lanzar un error
        if ( updates.length === 0 )
        {
            throw generateErrorUtil( 'No se proporcionaron campos para actualizar', 400 );
        }

        // Agregar el campo modifiedAt y el userId a los parámetros
        updates.push( 'modifiedAt = ?' );
        params.push( new Date() );
        params.push( userId );

        // Construir y ejecutar la consulta
        const query = `UPDATE users SET ${ updates.join( ', ' ) } WHERE userId = ?`;
        console.log( 'Consulta SQL:', query ); // Log de la consulta SQL
        console.log( 'Parámetros:', params ); // Log de los parámetros

        const [ result ] = await pool.query( query, params );
        console.log( 'Resultado de la consulta:', result ); // Log del resultado

    } catch ( err )
    {
        console.error( 'Error en updateUserModel:', err ); // Log del error para depuración
        throw generateErrorUtil( 'Error al actualizar el usuario', 500 );
    }
};

export default updateUserModel;