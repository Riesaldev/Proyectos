
import updateUserPassModel from "../models/updateUserPassModel.js";
import generateErrorUtil from "../utils/generateErrorsUtils.js";

const useRecoveryPassCodeController = async ( req, res, next ) => {
    try
    {
        const { recoverPassCode } = req.params;
        const { newPassword, repeatedNewPassword } = req.body;

        if ( !newPassword || !repeatedNewPassword )
        {
            generateErrorUtil( "Faltan campos", 400 );
        }

        if ( newPassword !== repeatedNewPassword )
        {
            generateErrorUtil( "Las contraseñas no coinciden", 400 );
        }

        await updateUserPassModel( newPassword, recoverPassCode );

        res.send( {
            status: "ok",
            message: "Contraseña actualizada",
        } );
    }
    catch ( err )
    {
        next( err );
    }
};

export default useRecoveryPassCodeController;