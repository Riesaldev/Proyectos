import UsersItem from '@/components/data/UsersItem';

const ProfileCards = ( { profile } ) => {
    return (
        <div className="flex flex-col items-center">
            <UsersItem profile={profile} />
        </div>
    );
};

export default ProfileCards;
