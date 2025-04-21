import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import useAuthContext from '@/hooks/useAuthContext.js';

const ProfileLayout = () => {
    const [ profiles, setProfiles ] = useState( [] );
    const { authUser, authToken } = useAuthContext();

    useEffect( () => {
        const fetchProfiles = async () => {
            try
            {
                const res = await fetch( `${ import.meta.env.VITE_API_URL }/api/users/${ authUser.userId }/profiles`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${ authToken }`,
                    },
                } );

                if ( !res.ok )
                {
                    throw new Error( 'Error fetching profiles' );
                }

                const data = await res.json();
                setProfiles( data.profiles || [] );
                console.log( data.profiles );
            } catch ( err )
            {
                console.error( err );
                toast.error( 'Error al cargar los perfiles' );
            }
        };

        if ( authUser )
        {
            fetchProfiles();
        }
    }, [ authUser, authToken ] );

    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='mb-6'>tus Perfiles de usuario</h1>
            <div className="flex flex-col items-center justify-center h-full bg-zinc-900">
                {profiles.map( ( profile ) => (
                    <div key={profile.profileId}>
                        <h2>{profile.profileName}</h2>
                        <a href=''>Avatar: {profile.avatar}</a>
                    </div>
                ) )}
            </div>
        </div>
    );
};

export default ProfileLayout;
