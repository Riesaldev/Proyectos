import generateErrorUtil from "../../utils/generateErrorUtil.js";
import insertUserModel from "../../models/users/insertUserModel.js";
import insertProfileModel from "../../models/users/insertProfileModel.js";

const registerUserController = async ( req, res, next ) => {
    try
    {
        const { email, password } = req.body;

        if ( !email || !password )
        {
            throw generateErrorUtil( "Faltan campos.", 400 );
        }

        // Registrar el usuario
        const userId = await insertUserModel( email, password );

        // Crear un perfil por defecto con el nombre basado en el email del usuario
        const defaultProfileName = email.split( '@' )[ 0 ]; // Usa la parte antes del '@' como nombre
        await insertProfileModel( userId, defaultProfileName );

        res.status( 201 ).send( {
            status: "ok",
            message: "Cuenta registrada con éxito. Por favor sigue las instrucciones en tu correo",
        } );
    } catch ( err )
    {
        next( err );
    }
};

export default registerUserController;