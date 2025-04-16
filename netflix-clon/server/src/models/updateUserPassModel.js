import { getPool } from "../db/getPool";
import generateErrorUtil from "../utils/generateErrorUtil";
import bcrypt from "bcrypt";

const updateUserPassModel = async ( userId, password, newPassword ) => {
    const pool = await getPool();

    const [ users ] = await pool.query(
        `SELECT password FROM users WHERE userId = ?`,
        [ userId ],
    );

    if ( users.length < 1 )
    {
        throw generateErrorUtil( "Usuario no encontrado", 404 );
    }

    const storedPassword = users[ 0 ].password;
    const passMatch = await bcrypt.compare( password, storedPassword );

    if ( !passMatch )
    {
        throw generateErrorUtil( "La contraseña actual es incorrecta", 401 );
    }

    const hashedPass = await bcrypt.hash( newPassword, 10 );
    const now = new Date();

    await pool.query(
        `UPDATE users SET password = ?, modifiedAt = ? WHERE userId = ?`,
        [ hashedPass, now, userId ],
    );
}

export default updateUserPassModel;