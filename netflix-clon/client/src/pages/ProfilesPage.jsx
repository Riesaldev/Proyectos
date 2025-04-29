import ProfileCards from '@/components/Cards/ProfileCards';
import Logo from '@/components/Logo';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const { VITE_API_URL } = import.meta.env;

const ProfilesPage = () => {
    const [ profiles, setProfiles ] = useState( [] );

    useEffect( () => {
        const fetchProfiles = async () => {
            try
            {
                const user = JSON.parse( localStorage.getItem( 'user' ) ) || {};
                if ( !user )
                {
                    throw new Error( 'Usuario no autenticado.' );
                }

                const response = await fetch( `${ VITE_API_URL }/api/users/${ user }/profiles`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
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
    }, [] );

    return (
        <div className="h-screen w-screen bg-gray-900">
            <div className="bg-gray-900 w-screen h-17 flex items-center ml-4">
                <Logo />
            </div>
            <div className="bg-black h-1/2 w-auto mt-16 items-center mx-auto rounded-lg shadow-lg flex flex-col">
                <h1 className="text-3xl text-center mt-8">¿Quién eres? Elige tu perfil</h1>
                <div className="flex flex-row gap-8 items-start justify-center my-18">
                    {profiles.map( ( profile ) => (
                        <ProfileCards key={profile.profileId} profile={profile} />
                    ) )}
                    <Link to="/create" className="items-center justify-center flex flex-col">
                        <Logo />
                        <p>Añadir perfil</p>
                    </Link>
                </div>
                <a href="/" className="border">
                    <p className="mx-6 my-2 text-xl">Administrar Perfiles</p>
                </a>
            </div>
        </div>
    );
};

export default ProfilesPage;
