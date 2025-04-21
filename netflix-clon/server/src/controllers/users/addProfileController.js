import insertProfileModel from "../../models/users/insertProfileModel.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const addProfileController = async ( req, res, next ) => {
    try
    {
        const { profileName, avatar } = req.body;
        const userId = req.user?.userId;

        if ( !profileName )
        {
            throw generateErrorUtil( "El nombre del perfil es obligatorio.", 400 );
        }

        const profileId = await insertProfileModel( userId, profileName, avatar );

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
