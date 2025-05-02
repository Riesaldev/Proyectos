import ProfileCards from '@/components/Cards/ProfileCards';
import Logo from '@/components/Logo';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAuthContext from '@/hooks/useAuthContext';
import { Button } from '@/components/ui/button';

const { VITE_API_URL } = import.meta.env;

const ProfilesPage = () => {
    const [ profiles, setProfiles ] = useState( [] );
    const { authToken, authUser } = useAuthContext(); // Obtenemos el token y el usuario del contexto

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
        <div className="h-screen w-screen bg-gray-900">
            <div className="bg-gray-900 w-screen h-17 flex items-center ml-4">
                <Logo />
            </div>
            <div className="bg-black opacity-80 h-1/2 w-auto mt-16 items-center mx-auto rounded-lg flex flex-col">
                <h1 className="text-3xl text-center mt-8">¿Quién eres? Elige tu perfil</h1>
                <div className="flex flex-row gap-8 items-start justify-center my-18">
                    {profiles.map( ( profile ) => (
                        <ProfileCards key={profile.profileId} profile={profile} />
                    ) )}
                    <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full hover:bg-gray-300 transition duration-300 ease-in-out">
                        <Button
                            className="items-center justify-center flex flex-col  bg-center bg-cover w-24 h-24 rounded-full cursor-pointer "
                            variant="primary"
                            size="icon"
                            onClick={() => {
                                window.location.href = '/create';
                            }}
                        >
                            <p className='text-8xl font-black  text-red-900 hover:text-gray-600 '>+</p>
                        </Button>
                    </div>
                </div>
                <Button
                    variant="secondary"
                    className="w-1/5 mx-auto my-6 shadow-red-500 bg-gray-600 text-white text-lg font-medium tracking-wider hover:bg-gray-600 hover:text-gray-900 cursor-pointer"
                    onClick={() => {
                        window.location.href = '/manage';
                    }
                    }
                >
                    Administrar perfiles
                </Button>
            </div>
        </div>
    );
};

export default ProfilesPage;
