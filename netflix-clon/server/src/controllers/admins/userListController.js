import selectAllUsersModel from "../../models/admins/selectAllUsersModel.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const userListController = async ( req, res, next ) => {
    try
    {
        if ( req.user.role !== "admin" )
        {
            generateErrorUtil(
                "Acceso denegado. Solo los administradores pueden acceder a esta información.",
                403
            );
        }
        const { userId, username, firstName, lastName, email } = req.query;
        const users = await selectAllUsersModel(
            userId,
            username,
            firstName,
            lastName,
            email
        );

        res.send( {
            status: "ok",
            data: users,
        } );
    } catch ( err )
    {
        next( err );
    }
};

export default userListController;