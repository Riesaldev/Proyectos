import insertProfileModel from "../../models/users/insertProfileModel.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const addProfileController = async ( req, res, next ) => {
    try
    {
        const { profileName, avatar } = req.body; // Ensure the field name matches the frontend

        if ( !profileName || profileName.trim() === '' ) // Validate profileName
        {
            throw generateErrorUtil( "El nombre del perfil es obligatorio.", 400 );
        }

        const userId = req.user?.userId;

        const profileId = await insertProfileModel( userId, profileName.trim(), avatar );

        res.status( 201 ).send( {
            status: "ok",
            message: "Perfil creado con éxito.",
            data: { profileId },
        } );
    } catch ( err )
    {
        next( err );
    }
};

export default addProfileController;
