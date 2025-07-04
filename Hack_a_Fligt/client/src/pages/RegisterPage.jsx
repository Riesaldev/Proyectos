//Importamos hooks
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

//Importamos dependencias
import toast from 'react-hot-toast';
import Header from '../components/Header';

//importamos variables de entorno
const { VITE_API_URL } = import.meta.env;

//Iniciamos el componente
const RegisterPage = () => {
    //obtenemos el contexto de autorización
    const { authUser } = useContext( AuthContext );
    //obtenemos navigate
    const navigate = useNavigate();
    //Creamos una variable en el State por cada elemento del forumlario
    const [ username, setUsername ] = useState( '' );
    const [ firstName, setFirstName ] = useState( '' );
    const [ lastName, setLastName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ passConfirm, setPassConfirm ] = useState( '' );
    const [ birthdate, setBirthdate ] = useState( '' );

    //Creamos una variable en el State para indicar si estamos haciendo fecth
    const [ loading, setLoading ] = useState( false );

    //función que maneja el envío del formulario
    const handleRegister = async ( e ) => {
        try
        {
            //prevenimos el envío del formulario por defecto
            e.preventDefault();
            //Realizamos la comprobación de si coinciden las contraseñas
            if ( password !== passConfirm )
            {
                throw new Error( 'Las contraseñas no coinciden' );
            }
            //indicamos  que estamos haciendo fetch
            setLoading( true );
            //obtenemos una respuesta
            const res = await fetch( `${ VITE_API_URL }/api/users/register`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( {
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                    birthdate,
                } ),
            } );

            //obtenemos el body
            const body = await res.json();

            //Si  hay un error, lanzamos un mensaje
            if ( body.status === 'error' )
            {
                throw new Error( body.message );
            }

            //si sale el registro bien, lanzamos un mensaje
            toast.success( body.message, {
                id: 'register',
                duration: 10000,
            } );

            //redirigimos a la página de login
            navigate( '/login' );
        } catch ( err )
        {
            toast.error( err.message, {
                id: 'register',
            } );
        } finally
        {
            //Indicamos que el fetch ha terminado
            setLoading( false );
        }
    };
    //Si el usuario está logueado, redirigimos a la página de home
    if ( authUser )
    {
        navigate( '/' );
    }
    return (
        <>
            <Header />
            <main className='bg-gradient-to-b from-dark-blue to-white flex items-center justify-center min-screen p-4'>
                <div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-5xl'>
                    <h2 className='text-3xl font-heading font-light text-dark-blue text-center mb-8'>
                        CREA TU CUENTA
                    </h2>

                    <form
                        onSubmit={handleRegister}
                        className='grid grid-cols-1 md:grid-cols-2 gap-4'
                    >
                        <div>
                            <label
                                htmlFor='firstName'
                                className='block text-dark-blue font-body'
                            >
                                Nombre
                            </label>
                            <input
                                type='text'
                                id='firstName'
                                value={firstName}
                                onChange={( e ) => setFirstName( e.target.value )}
                                className='w-full p-3 border border-[#3951AA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#179DD9]'
                                required
                            />
                        </div>
                        <div>
                            <div>
                                <label
                                    htmlFor='lastName'
                                    className='block text-[#083059] font-medium'
                                >
                                    Apellidos
                                </label>
                                <input
                                    type='text'
                                    id='lastName'
                                    value={lastName}
                                    onChange={( e ) =>
                                        setLastName( e.target.value )
                                    }
                                    className='w-full p-3 border border-[#3951AA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#179DD9]'
                                    required
                                />
                            </div>
                            <label
                                htmlFor='username'
                                className='block text-dark-blue font-body'
                            >
                                Usuario
                            </label>
                            <input
                                type='text'
                                id='username'
                                value={username}
                                onChange={( e ) => setUsername( e.target.value )}
                                className='w-full p-3 border border-[#3951AA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#179DD9]'
                                required
                            />
                        </div>

                        <div className='md:col-span-2'>
                            <label
                                htmlFor='email'
                                className='block text-dark-blue font-body'
                            >
                                Correo Electrónico
                            </label>
                            <input
                                type='email'
                                id='email'
                                value={email}
                                onChange={( e ) => setEmail( e.target.value )}
                                className='w-full p-3 border border-[#3951AA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#179DD9]'
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor='password'
                                className='block text-dark-blue font-body'
                            >
                                Contraseña
                            </label>
                            <input
                                type='password'
                                id='password'
                                value={password}
                                onChange={( e ) => setPassword( e.target.value )}
                                className='w-full p-3 border border-[#3951AA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#179DD9]'
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor='passConfirm'
                                className='block text-dark-blue font-body'
                            >
                                Confirmar Contraseña
                            </label>
                            <input
                                type='password'
                                id='passConfirm'
                                value={passConfirm}
                                onChange={( e ) => setPassConfirm( e.target.value )}
                                className='w-full p-3 border border-[#3951AA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#179DD9]'
                                required
                            />
                        </div>
                        <div className='md:col-span-2'>
                            <label
                                htmlFor='birthdate'
                                className='block text-dark-blue font-body'
                            >
                                Fecha de Nacimiento
                            </label>
                            <input
                                type='date'
                                id='birthdate'
                                value={birthdate}
                                onChange={( e ) => setBirthdate( e.target.value )}
                                className='w-full p-3 border border-[#3951AA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#179DD9]'
                                required
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={loading}
                            className='top-3 relative py-2 px-4 text-accent-blue text-base font-bold overflow-hidden bg-medium-blue rounded-full transition-all duration-400 ease-in-out shadow-lg hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-accent-blue before:to-medium-blue before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </form>

                    <p className='text-center text-dark-blue mt-4'>
                        ¿Ya tienes cuenta?{' '}
                        <a
                            href='/login'
                            className='text-medium-blue font-bold hover:underline'
                        >
                            Inicia sesión
                        </a>
                    </p>
                </div>
            </main>
        </>
    );
};

export default RegisterPage;
