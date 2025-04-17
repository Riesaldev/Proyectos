import deleteUserModel from "../../models/admins/deleteUserModel.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const deleteUserController = async ( req, res, next ) => {
    try
    {
        const { id } = req.params;

        if ( req.user.role !== "admin" )
        {
            generateErrorUtil( "Faltan permisos de administrador", 403 );
        }
        await deleteUserModel( id );

        res.send( {
            status: "ok",
            message: "Usuario borrado con exito.",
        } );
    } catch ( err )
    {
        next( err );
    }
};

export default deleteUserController;
