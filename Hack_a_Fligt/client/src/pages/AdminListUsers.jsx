import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Importamos el hook personalizado
import useUsersList from '../hooks/useUsersList.js';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header.jsx';

// Obtenemos las variables de entorno
const { VITE_API_URL } = import.meta.env;

// Iniciamos el componente
const AdminListUsers = () => {
    const [ searchValues ] = useState( {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
    } );

    // Obtenemos los elementos necesarios del contexto pertinente.

    const { users, loading } = useUsersList( searchValues );
    const { authToken } = useContext( AuthContext );
    const navigate = useNavigate();
    const token = authToken;

    // Estado para manejar la lista de usuarios en la UI
    const [usersList, setUsersList] = useState([]);

    // Actualizar la lista local de usuarios cuando `users` cambie
    useEffect(() => {
        setUsersList(users);
    }, [users]);

    // Habilitar/Deshabilitar usuario
    const handleToggleUserStatus = async ( userId, isActive ) => {
        try
        {
            const res = await fetch( `${ VITE_API_URL }/api/admin/users/${ userId }/true`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', // Necesario para enviar JSON
                    Authorization: `${ authToken }`,
                },
                body: JSON.stringify( { isActive: !isActive } ) // Debe ir dentro del objeto
            } );
            const data = await res.json();
            if ( !res.ok ) throw new Error( data.message );

            toast.success(
                `Usuario ${ !isActive ? 'habilitado' : 'deshabilitado'
                } correctamente.`,
            );
            toast( 'Recarga la página para ver los cambios.' );
        } catch ( error )
        {
            toast.error(
                `Error: ${ error.message || 'No se pudo actualizar el usuario.' }`,
            );
        }
    };

    // Borrar usuario
    const handleDeleteUser = async ( userId ) => {
        if ( !window.confirm( '¿Estás seguro de eliminar este usuario?' ) ) return;

        try
        {
            const res = await fetch( `${ VITE_API_URL }/api/admin/users/${ userId }`,
                {
                    method: 'DELETE',
                    headers: { Authorization: `${ authToken }` }
                }, );

            const data = await res.json();
            if ( !res.ok ) throw new Error( data.message );

            toast.success( 'Usuario eliminado correctamente.' );
            toast( 'Recarga la página para ver los cambios.' );
        } catch ( error )
        {
            toast.error(
                `Error: ${ error.message || 'No se pudo eliminar el usuario.' }`,
            );
        }
    };

    useEffect( () => {
        if ( !token )
        {
            toast.error( 'No tienes permisos para ver esta página.' );
            navigate( '/login' );
        }
    }, [ token, navigate ] );

    return (
        <>
            <Header />
            <main className='min-h-screen bg-[#e5f7ff] p-4 overflow-x-hidden'>

                {/*
                <div>
                    <input
                        type='text'
                        name='username'
                        placeholder='Buscar por usuario'
                        value={searchValues.username}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        name='email'
                        placeholder='Buscar por email'
                        value={searchValues.email}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        name='firstName'
                        placeholder='Buscar por nombre'
                        value={searchValues.firstName}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        name='lastName'
                        placeholder='Buscar por apellido'
                        value={searchValues.lastName}
                        onChange={handleChange}
                    />
                </div>

                */}

                {loading ? (
                    <p className='text-center'>Cargando usuarios...</p>
                ) : (
                    <table className="min-w-full border border-blue-300 table-auto">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className="px-2 py-2 border-b text-center">Usuario</th>
                                <th className="px-2 py-2 border-b text-center">Email</th>
                                <th className="px-2 py-2 border-b text-center">Nombre</th>
                                <th className="px-2 py-2 border-b text-center">Apellido</th>
                                <th className="px-2 py-2 border-b text-center">Estado</th>
                                <th className="px-2 py-2 border-b text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map( ( user ) => (
                                <tr key={user.userId} className="odd:bg-white even:bg-blue-50">
                                    <td className="px-2 py-2 border-b text-center">{user.username}</td>
                                    <td className="px-2 py-2 border-b text-center">{user.email}</td>
                                    <td className="px-2 py-2 border-b text-center">{user.firstName}</td>
                                    <td className="px-2 py-2 border-b text-center">{user.lastName}</td>
                                    <td className="px-2 py-2 border-b text-center">
                                        {user.isActive ? 'Activo' : 'Inactivo'}
                                    </td>
                                    <td className="px-2 py-2 border-b text-center flex justify-center space-x-2">
                                        <button
                                            onClick={() =>
                                                handleToggleUserStatus( user.userId, user.isActive )
                                            }
                                            className={`py-1 px-2 text-xs text-white ${ user.isActive ? 'bg-red-500' : 'bg-green-500'
                                                } rounded hover:bg-opacity-80 transition`}
                                        >
                                            {user.isActive ? 'Deshabilitar' : 'Habilitar'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser( user.userId )}
                                            className='py-1 px-2 text-xs text-white bg-red-500 rounded hover:bg-red-600 transition'
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ) )}
                        </tbody>
                    </table>
                )}
            </main>
        </>
    );
};

export default AdminListUsers;