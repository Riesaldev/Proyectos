import selectProfilesByUserIdModel from "../../models/users/selectProfilesByUserIdModel.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const userProfilesController = async ( req, res, next ) => {
    try
    {
        const userId = req.user?.userId; // Obtén el userId del middleware
        if ( !userId )
        {
            throw generateErrorUtil( 'Usuario no autenticado.', 401 );
        }

        const profiles = await selectProfilesByUserIdModel( userId );

        res.send( {
            status: 'ok',
            data: {
                profiles,
            },
        } );
    } catch ( err )
    {
        next( err );
    }
};

export default userProfilesController;