import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import useAuthContext from '@/hooks/useAuthContext.js';
import { Button } from './ui/button';

const ProfileLayout = () => {
    const [ profiles, setProfiles ] = useState( [] );
    const [ newProfileName, setNewProfileName ] = useState( '' );
    const { authUser, authToken } = useAuthContext();

    const handleAddProfile = async () => {
        try
        {
            const res = await fetch(
                `${ import.meta.env.VITE_API_URL }/api/users/profiles`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${ authToken }`,
                    },
                    body: JSON.stringify( { profileName: newProfileName } ),
                }
            );

            if ( !res.ok )
            {
                throw new Error( 'Error al crear el perfil' );
            }

            toast.success( 'Perfil creado con éxito' );
            setNewProfileName( '' );
            fetchProfiles(); // Refrescar la lista de perfiles
        } catch ( err )
        {
            console.error( err );
            toast.error( 'Error al crear el perfil' );
        }
    };

    const fetchProfiles = React.useCallback( async () => {
        try
        {
            const res = await fetch(
                `${ import.meta.env.VITE_API_URL }/api/users/${ authUser?.userId }/profiles`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${ authToken }`,
                    },
                }
            );

            if ( !res.ok )
            {
                throw new Error( 'Error fetching profiles' );
            }

            const data = await res.json();
            setProfiles( data.data.profiles || [] );
            console.log( data.data.profiles );
        } catch ( err )
        {
            console.error( err );
            toast.error( 'Error al cargar los perfiles...' );
        }
    }, [ authUser, authToken ] );

    const handleDeleteProfile = async ( profileId ) => {
        try
        {
            const res = await fetch(
                `${ import.meta.env.VITE_API_URL }/api/users/profiles/${ profileId }`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${ authToken }`,
                    },
                }
            );

            if ( !res.ok )
            {
                throw new Error( 'Error al eliminar el perfil' );
            }

            toast.success( 'Perfil eliminado con éxito' );
            fetchProfiles(); // Refrescar la lista de perfiles
        } catch ( err )
        {
            console.error( err );
            toast.error( 'Error al eliminar el perfil' );
        }
    };

    useEffect( () => {
        if ( authUser )
        {
            fetchProfiles();
        }
    }, [ authUser, authToken, fetchProfiles ] );

    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='mb-6'>Tus Perfiles de usuario</h1>
            <div className="flex flex-col items-center justify-center h-full bg-zinc-900">
                {profiles.map( ( profile ) => (
                    <div key={profile.profileId}>
                        <a href=''>Avatar: {profile.avatar}</a>
                        <h2>{profile.profileName}</h2>
                        {profile.profileId !== 1 && (
                            <Button
                                type="button"
                                onClick={() => handleDeleteProfile( profile.profileId )}
                                className="w-full bg-[#E50914]"
                            >
                                Eliminar
                            </Button>
                        )}
                    </div>
                ) )}
            </div>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Nombre del nuevo perfil"
                    value={newProfileName}
                    onChange={( e ) => setNewProfileName( e.target.value )}
                    className="p-2 border rounded"
                />
                <button
                    onClick={handleAddProfile}
                    className="ml-2 p-2 bg-[#E50914] text-white rounded"
                >
                    Añadir perfil
                </button>
            </div>
        </div>
    );
};

export default ProfileLayout;
