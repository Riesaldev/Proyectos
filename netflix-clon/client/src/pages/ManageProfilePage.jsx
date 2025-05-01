import { useEffect, useState } from 'react';
import ProfileCards from '@/components/Cards/ProfileCards';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthContext from '@/hooks/useAuthContext';
import { useDeleteProfile, useEditProfile } from '@/hooks/profileHooks'; // Import the new hooks

const { VITE_API_URL } = import.meta.env;

const ManageProfilePage = () => {
    const [ profiles, setProfiles ] = useState( [] );
    const { authToken, authUser } = useAuthContext();
    const deleteProfile = useDeleteProfile( authToken, setProfiles, profiles );
    const editProfile = useEditProfile( authToken, setProfiles, profiles );

    useEffect( () => {
        const fetchProfiles = async () => {
            try
            {
                if ( !authToken || !authUser?.userId )
                {
                    throw new Error( 'Usuario no autenticado.' );
                }

                const response = await fetch( `${ VITE_API_URL }/api/users/${ authUser.userId }/profiles`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${ authToken }`,
                    },
                } );

                const body = await response.json();

                if ( !response.ok )
                {
                    throw new Error( body.message || 'Error al cargar los perfiles.' );
                }

                setProfiles( body.data.profiles );
            } catch ( error )
            {
                toast.error( error.message || 'Error al cargar los perfiles.' );
            }
        };

        fetchProfiles();
    }, [ authToken, authUser ] );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Mis Perfiles</h1>
            <div>
                {profiles.map( ( profile ) => (
                    <ProfileCards
                        key={profile.profileId}
                        profile={profile}
                        onEdit={() => editProfile( profile.profileId )}
                        onDelete={() => deleteProfile( profile.profileId )}
                    />
                ) )}
            </div>
            <Link to="/create-profile" className="text-blue-500 hover:underline mt-4 block">
                Crear nuevo perfil
            </Link>
        </div>
    );
};

export default ManageProfilePage;
