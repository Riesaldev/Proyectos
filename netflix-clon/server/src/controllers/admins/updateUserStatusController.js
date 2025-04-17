import updateUserStatusModel from "../../models/admins/updateUserStatusModel.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const updateUserStatusController = async ( req, res, next ) => {
    try
    {
        const { id } = req.params;

        if ( req.user.role !== "admin" )
        {
            generateErrorUtil( "Faltan permisos de administrador", 403 );
        }

        const { newStatus } = await updateUserStatusModel( { userId: id } );

        res.send( {
            status: "ok",
            message: "Estado del usuario actualizado con exito.",
            active: newStatus,
        } );
    } catch ( err )
    {
        next( err );
    }
};

export default updateUserStatusController;