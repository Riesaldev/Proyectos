// Importamos los hooks.
import { useState, useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
// Importamos la función que muestra un mensaje al usuario.
import toast from 'react-hot-toast';
// Importamos el contexto de autorización.
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header.jsx';
// Importamos la URL de nuestra API.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente
const ResetPassword = () => {
    // obtenemos el toquen de autenticación del contexto
    const navigate = useNavigate();
    const { recoverPassCode } = useParams();
    // para el cambio de contraseña
    const [ newPassword, setNewPassword ] = useState( '' );
    const [ confirmPassword, setConfirmPassword ] = useState( '' );
    const { authUser } = useContext( AuthContext );
    // cargando
    const [ loading, setLoading ] = useState( false );

    const handlePasswordChange = async ( e ) => {
        try
        {
            // Doble validación de la nueva contraseña
            e.preventDefault();
            if ( newPassword !== confirmPassword )
            {
                toast.error( 'Las contraseñas no coinciden' );
                return;
            }
            setLoading( true );
            // realizamos la petición a la API para la actualización de contraseña
            const response = await fetch(
                `${ VITE_API_URL }/api/users/password/reset/${ recoverPassCode }`,
                {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify( {
                        newPassword,
                        confirmPassword,
                    } ),
                },
            );

            const body = await response.json();

            if ( body.status === 'error' )
            {
                throw new Error( body.message );
            }

            toast.success( body.message, {
                id: 'useRecoveryPass',
            } );

            navigate( '/login' );
        } catch ( err )
        {
            toast.error( err.message, {
                id: 'useRecoveryPass',
            } );
        } finally
        {
            setLoading( false );
        }
    };
    if ( authUser )
    {
        return <Navigate to='/' />;
    }
    return (
        <>
            <Header />
            <main className='bg-[#E5f7ff] min-h-screen flex items-center justify-center p-4'>
                <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-sm'>
                    <h2>Cambiar Contraseña</h2>
                    <form onSubmit={handlePasswordChange} className='space-y-4'>
                        <div>
                            <label className='block text-[#083059] font-medium text-sm mb-1'>
                                Nueva Contraseña
                            </label>
                            <input
                                type='password'
                                value={newPassword}
                                onChange={( e ) => setNewPassword( e.target.value )}
                                required
                                autoComplete='new-password'
                                disabled={loading}
                                className='w-full p-3 border border-[#3951AA rounded-md focus:outline-none focus:ring-2 focus:ring-[#179DD9]'
                            />
                        </div>
                        <div>
                            <label className='block text-[#083059] font-medium text-sm mb-1'>
                                Confirmar Contraseña
                            </label>
                            <input
                                type='password'
                                value={confirmPassword}
                                onChange={( e ) =>
                                    setConfirmPassword( e.target.value )
                                }
                                required
                                autoComplete='new-password'
                                disabled={loading}
                                className='w-full p-3 border border-[#3951AA rounded-md focus:outline-none focus:ring-2 focus:ring-[#179DD9'
                            />
                        </div>
                        <button
                            type='submit'
                            disabled={loading}
                            className='top-3 relative py-2 px-4 text-accent-blue text-base font-bold overflow-hidden bg-medium-blue rounded-full transition-all duration-400 ease-in-out shadow-lg hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-accent-blue before:to-medium-blue before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                        >
                            {loading ? 'Actualizando...' : 'Cambiar contraseña'}
                        </button>
                    </form>
                    <button
                        onClick={() => navigate( '/users/profile' )}
                        disabled={loading}
                        className='top-3 relative py-2 px-4 text-accent-blue text-base font-bold overflow-hidden bg-medium-blue rounded-full transition-all duration-400 ease-in-out shadow-lg hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-accent-blue before:to-medium-blue before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                    >
                        Cancelar
                    </button>
                </div>
            </main>
        </>
    );
};

export default ResetPassword;
