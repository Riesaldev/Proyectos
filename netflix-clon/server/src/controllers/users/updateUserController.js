import updateUserModel from '../../models/users/updateUserModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateUserController = async ( req, res, next ) => {
    try
    {
        const { firstName, lastName, username, email } = req.body;

        if ( !firstName && !lastName && !username && !email )
        {
            throw generateErrorUtil( 'No se proporcionaron campos para actualizar.', 400 );
        }
        const userId = req.user?.userId;

        if ( !userId )
        {
            throw generateErrorUtil( 'Usuario no autenticado o ID de usuario no proporcionado.', 401 );
        }
        await updateUserModel( {
            firstName,
            lastName,
            username,
            email,
            userId,
        } );
        res.status( 200 ).send( {
            status: 'ok',
            message: 'Usuario actualizado correctamente.',
        } );
    } catch ( err )
    {
        next( err );
    }
};

export default updateUserController;