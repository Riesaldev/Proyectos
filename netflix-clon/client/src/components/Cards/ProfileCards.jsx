import React from 'react';

const ProfileCards = ( { profile } ) => {

    const { avatar, userName } = profile;

    return (
        <div>
            // avatar
            <div className="flex flex-col items-center justify-center">
                <img>
                    {avatar}
                </img>
            </div>
            //dates
            <div className="flex flex-col items-center justify-center">
                <p className="text-lg font-semibold">{userName}</p>

            </div>
        </div>
    );
}

export default ProfileCards;
