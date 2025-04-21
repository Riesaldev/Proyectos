import selectProfilesByUserIdModel from "../../models/users/selectProfilesByUserIdModel.js";

const userProfilesController = async ( req, res, next ) => {
    try
    {
        const { userId } = req.params;
        console.log( "Fetching profiles for userId:", userId ); // Debug log

        const profiles = await selectProfilesByUserIdModel( userId );

        res.send( {
            status: "ok",
            data: {
                profiles, // Devuelve una lista vacía si no hay perfiles
            },
        } );
    } catch ( err )
    {
        console.error( "Error in userProfilesController:", err ); // Debug log
        next( err );
    }
};

export default userProfilesController;