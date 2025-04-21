import { getPool } from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectProfilesByUserIdModel = async ( userId ) => {
    try
    {
        const pool = await getPool();
        console.log( "Executing query to fetch profiles for userId:", userId ); // Debug log

        const [ profiles ] = await pool.query(
            `
            SELECT profileId, profileName, avatar, createdAt 
            FROM profiles 
            WHERE userId = ?
            `,
            [ userId ],
        );

        if ( profiles.length < 1 )
        {
            console.log( "No profiles found for userId:", userId ); // Debug log
            throw generateErrorUtil( 'No se encontraron perfiles.', 404 );
        }

        console.log( "Profiles fetched successfully:", profiles ); // Debug log
        return profiles;
    } catch ( error )
    {
        console.error( "Error in selectProfilesByUserIdModel:", error ); // Debug log
        throw generateErrorUtil( 'Error fetching profiles from database.', 500 );
    }
};

export default selectProfilesByUserIdModel;