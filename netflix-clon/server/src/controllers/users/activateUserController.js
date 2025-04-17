import activateUserModel from "../../models/activateUserModel";

const activateUserController = async ( req, res, next ) => {
    try
    {
        const { regCode } = req.params;
        await activateUserModel( regCode );

        res.send( {
            status: "ok",
            message: "Usuario activado.",
        } );
    } catch ( err )
    {
        next( err );
    }
};

export default activateUserController;