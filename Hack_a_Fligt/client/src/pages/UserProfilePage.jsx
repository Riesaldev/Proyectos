// Importamos los hooks.
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos la función que muestra un mensaje al usuario.
import toast from 'react-hot-toast';
// Importamos el contexto de autorización.
import useAuthContext from '../hooks/useAuthContext.js';
//importamos momento para configurar la fehca entregada por el servidor
import moment from 'moment';
import Header from '../components/Header.jsx';

// Importamos la URL de nuestra API.
const { VITE_API_URL } = import.meta.env;
// Inicializamos el componente
const UserProfilePage = () => {
    // obtenemos el toquen de autenticación del contexto
    const { authToken } = useAuthContext();
    const navigate = useNavigate();

    // Para almacenar los datos del usuario
    const [ userData, setUserData ] = useState( null );
    const [ profileLoading, setProfileLoading ] = useState( true );

    // obtenemos los datos del usuario al cargar la página
    useEffect( () => {
        // si no hay toquen, regresamos a la página de login
        if ( !authToken )
        {
            navigate( '/login' );
            return;
        }

        const fetchUserData = async () => {
            setProfileLoading( true );
            try
            {
                // Realizamos una precisión a la API para la información del usuario
                const response = await fetch(
                    `${ VITE_API_URL }/api/users/profile`,
                    { headers: { Authorization: `${ authToken }` } },
                );

                // Si no hay respuesta, se lanza un error
                if ( !response.ok )
                    throw new Error(
                        `Error ${ response.status }: ${ response.statusText }`,
                    );

                const data = await response.json();
                setUserData( data.data.user );
            } catch ( error )
            {
                toast.error(
                    error.message || 'Error al obtener los datos del usuario',
                );
            } finally
            {
                setProfileLoading( false );
            }
        };

        fetchUserData();
    }, [ authToken, navigate ] );

    // Mostramos mensajes de perfil cargando...
    if ( profileLoading )
    {
        return (
            <div className='bg-gradiwnt-to-b from-dark-blue to-white min-h-screen flex items-center justify-center'>
                <p className='text-center mt-4 text-dark-blue font-body'>
                    Cargando perfil...
                </p>
            </div>
        );
    }
    // Si el perfil no carga, mostramos un error.
    if ( !userData )
    {
        return (
            <p className='text-center mt-4 text-dark-blue font-body'>
                No se pudo cargar la información del usuario.
            </p>
        );
    }

    return (
        <>
            <Header />
            <main className='bg-gradient-to-b from-dark-blue to-white min-h-screen flex flex-col justify-between'>
                <div className='flex flex-col items-center justify-center flex-1 p-4'>
                    <div className='bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-lg lg:max-w-4xl border-2 border-accent-blue'>
                        <h2 className='text-3xl sm:text-4xl font-heading font-light text-dark-blue text-center mb-6'>
                            PERFIL DE USUARIO
                        </h2>
                        {/* Mostramos la información de usuario */}
                        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-16'>
                            <div className='flex flex-col items-center'>
                                <img
                                    src={
                                        userData.avatar !== null
                                            ? `${ VITE_API_URL }/uploads/${ userData.avatar }`
                                            : '/default-avatar.png'
                                    }
                                    alt='Avatar'
                                    className='w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-lg'
                                />
                            </div>
                            <div className='mt-6 lg:mt-7 lg:w-3/3'>
                                <div className='space-y-3'>
                                    <p className='text-dark-blue text-base sm:text-lg font-body'>
                                        <strong>Nombre:</strong>{' '}
                                        {userData.firstName} {userData.lastName}
                                    </p>
                                    <p className='text-dark-blue text-base sm:text-lg font-body'>
                                        <strong>Usuario:</strong>{' '}
                                        {userData.username}
                                    </p>
                                    <p className='text-dark-blue text-base sm:text-lg font-body'>
                                        <strong>Email:</strong> {userData.email}
                                    </p>
                                    <p className='text-dark-blue text-base sm:text-lg font-body'>
                                        <strong>Edad:</strong>{' '}
                                        {moment().diff(
                                            moment( userData.birthdate ),
                                            'years',
                                        )}{' '}
                                        años
                                    </p>
                                    <p className='text-dark-blue text-base sm:text-lg font-body'>
                                        <strong>Miembro desde:</strong>{' '}
                                        {moment( userData.createdAt ).format(
                                            'DD/MM/YYYY',
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-around mt-6'>
                            <button
                                onClick={() => navigate( '/users/profile/edit' )}
                                className='top-3 relative py-2 px-4 text-accent-blue text-base font-bold overflow-hidden bg-medium-blue rounded-full transition-all duration-400 ease-in-out shadow-lg hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-accent-blue before:to-medium-blue before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                            >
                                Editar perfil
                            </button>
                            <button
                                onClick={() =>
                                    navigate( '/users/profile/password' )
                                }
                                className='top-3 relative py-2 px-4 text-accent-blue text-base font-bold overflow-hidden bg-medium-blue rounded-full transition-all duration-400 ease-in-out shadow-lg hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-accent-blue before:to-medium-blue before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                            >
                                Cambiar contraseña
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default UserProfilePage;
