import deleteProfileModel from "../../models/users/deleteProfileModel.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const deleteProfileController = async ( req, res, next ) => {
    try
    {
        const { profileId } = req.params;
        const userId = req.user?.userId;

        const success = await deleteProfileModel( profileId, userId );

        if ( !success )
        {
            throw generateErrorUtil( "Perfil no encontrado o no autorizado.", 404 );
        }

        res.send( {
            status: "ok",
            message: "Perfil eliminado con éxito.",
        } );
    } catch ( err )
    {
        next( err );
    }
};

export default deleteProfileController;
