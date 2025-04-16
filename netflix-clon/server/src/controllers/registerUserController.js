import generateErrorUtil from "../utils/generateErrorsUtils.js";
import insertUserModel from "../models/insertUserModel.js";

const registerUserController = async ( req, res, next ) => {
    try
    {
        const { email, password } = req.body;

        if ( !email || !password )
        {
            generateErrorUtil( 'Faltan campos.', 400 );
        }

        await insertUserModel(
            email,
            password,
        );

        res.status( 201 ).send( {
            status: 'ok',
            message:
                'Cuenta registrada con éxito. Por favor sigue las instucciones en tu correo',
        } );

    } catch ( err )
    {
        next( err );
    }
}
export default registerUserController;