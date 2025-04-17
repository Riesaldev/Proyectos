import updateUserPassModel from '../../models/users/updateUserPassModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateUserPassController = async ( req, res, next ) => {
    try
    {
        const userId = req.user?.userId;
        const { password, newPassword } = req.body;

        if ( !password || !newPassword )
        {
            generateErrorUtil( 'Faltan campos obligatorios.', 400 );
        }

        await updateUserPassModel( userId, password, newPassword );

        res.status( 200 ).send( {
            status: 'ok',
            message: 'Contraseña actualizada correctamente.',
        } );
    } catch ( err )
    {
        next( err );
    }
};

export default updateUserPassController;