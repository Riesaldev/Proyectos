import { useEffect, useState } from 'react';
import ProfileCards from '@/components/Cards/ProfileCards';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthContext from '@/hooks/useAuthContext';
import { useDeleteProfile, useEditProfile } from '@/hooks/profileHooks'; // Import the new hooks
import Layout from '@/components/Layout';
import FormLayout from '@/components/FormLayout';

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
            <Layout />
            <FormLayout >
                <div className='flex flex-col items-center justify-center h-1/2'>
                    <h1 className="text-2xl font-bold mb-4">Mis Perfiles</h1>
                    <div className='flex flex-wrap gap-4 justify-around'>
                        {profiles.map( ( profile ) => (
                            <div key={profile.profileId} className="flex flex-col items-center">
                                <ProfileCards
                                    profile={profile}
                                    onEdit={() => editProfile( profile.profileId )}
                                    onDelete={() => deleteProfile( profile.profileId )}
                                >
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => editProfile( profile.profileId )}
                                    >
                                        <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full" />
                                        <p className="text-center mt-2">{profile.name}</p>
                                    </div>
                                </ProfileCards>
                                <button
                                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => deleteProfile( profile.profileId )}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ) )}
                    </div>
                    <Link to="/profile" className="text-blue-500 hover:underline mt-4 block">
                        Crear nuevo perfil
                    </Link>
                </div>
            </FormLayout>
        </div>
    );
};

export default ManageProfilePage;
