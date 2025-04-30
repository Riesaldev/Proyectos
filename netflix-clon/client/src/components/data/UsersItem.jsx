import { Link } from 'react-router-dom';

const UsersItem = ( { profile } ) => {
    const avatar = profile?.avatar || '/img/default-avatar.png';
    const { profileId, profileName } = profile || {};

    if ( !profileId || !profileName )
    {
        return null;
    }

    return (
        <Link to={`/profile/${ profileId }`} className="flex flex-col items-center justify-between w-full h-full">
            <img
                src={avatar}
                alt="avatar"
                className="w-24 h-24 rounded-full hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            />
            <p className="text-white mt-2">{profileName}</p>
        </Link>
    );
};

export default UsersItem;
