import { Link } from 'react-router-dom';

const UsersItem = ( { profile } ) => {
    const { profileId, profileName, avatar } = profile || {};

    if ( !profileId || !profileName )
    {
        return null;
    }

    return (
        <Link to={`/profile/${ profileId }`} className="flex flex-col items-center justify-between w-full h-full">
            <img
                src={avatar || '/default-avatar.png'}
                alt={`${ profileName }'s avatar`}
                className="w-24 h-24 rounded-full"
            />
            <p className="text-white mt-2">{profileName}</p>
        </Link>
    );
};

export default UsersItem;
