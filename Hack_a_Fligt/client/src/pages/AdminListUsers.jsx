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
<<<<<<< HEAD

    const { users, loading } = useUsersList( searchValues );
    const { authToken } = useContext( AuthContext );
=======
    const { users, loading } = useUsersList(searchValues);
    const { authToken } = useContext(AuthContext);
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
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
<<<<<<< HEAD
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
=======
                    'Content-Type': 'application/json',
                    Authorization: `${authToken}`,
                },
                body: JSON.stringify({ isActive: !isActive })
            });
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1

            const data = await res.json();
            if ( !res.ok ) throw new Error( data.message );

<<<<<<< HEAD
            toast.success( 'Usuario eliminado correctamente.' );
            toast( 'Recarga la página para ver los cambios.' );
        } catch ( error )
        {
            toast.error(
                `Error: ${ error.message || 'No se pudo eliminar el usuario.' }`,
=======
            // Actualizar el estado del local users
            setUsersList((prevUsers) =>
                prevUsers.map((user) =>
                    user.userId === userId ? { ...user, isActive: !isActive } : user
                )
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
            );

            toast.success(`Usuario ${!isActive ? 'habilitado' : 'deshabilitado'} correctamente.`);
        } catch (error) {
            toast.error(`Error: ${error.message || 'No se pudo actualizar el usuario.'}`);
        }
    };

<<<<<<< HEAD
    useEffect( () => {
        if ( !token )
        {
            toast.error( 'No tienes permisos para ver esta página.' );
            navigate( '/login' );
=======
 // Borrar usuario
const handleDeleteUser = async (userId) => {
    // Confirmación para borrar
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
        // Realizar la solicitud DELETE al backend
        const res = await fetch(`${VITE_API_URL}/api/admin/users/${userId}`, {
            method: 'DELETE',
            headers: { Authorization: `${authToken}` },
        });

        const data = await res.json();

        // Si la respuesta no es exitosa, lanzamos un error
        if (!res.ok) throw new Error(data.message);

        // Actualizar la lista de usuarios en el estado local, eliminando el usuario
        setUsersList((prevUsers) => 
            prevUsers.filter((user) => user.userId !== userId) // Eliminamos al usuario de la lista
        );

        // Mostrar un mensaje de éxito
        toast.success('Usuario eliminado correctamente.');
        toast('Recarga la página para ver los cambios.');
    } catch (error) {
        // Manejar errores si algo sale mal
        toast.error(`Error: ${error.message || 'No se pudo eliminar el usuario.'}`);
    }
};

    useEffect(() => {
        if (!token) {
            toast.error('No tienes permisos para ver esta página.');
            navigate('/login');
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
        }
    }, [ token, navigate ] );

    return (
        <>
            <Header />
<<<<<<< HEAD
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
=======
            <main className="bg-gradient-to-b from-dark-blue to-white min-h-screen flex flex-col justify-between">
                <div className="flex flex-col items-center justify-center flex-1 p-4">
                    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-lg lg:max-w-4xl transition transform hover:scale-[1.008]">
                        <h2 className="text-3xl sm:text-4xl font-heading font-light text-dark-blue text-center mb-6">
                            Lista de Usuarios
                        </h2>

                        {loading ? (
                            <p className="text-center text-dark-blue">Cargando usuarios...</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-blue-300 table-fixed">
                                    <thead>
                                        <tr className="bg-blue-100">
                                            <th className="px-4 py-2 border-b text-center">Usuario</th>
                                            <th className="px-4 py-2 border-b text-center">Email</th>
                                            <th className="px-4 py-2 border-b text-center">Nombre</th>
                                            <th className="px-4 py-2 border-b text-center">Apellido</th>
                                            <th className="px-4 py-2 border-b text-center">Estado</th>
                                            <th className="px-4 py-2 border-b text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usersList.map((user) => (
                                            <tr key={user.userId} className="odd:bg-white even:bg-blue-50">
                                                <td className="px-4 py-2 border-b text-center">{user.username}</td>
                                                <td className="px-4 py-2 border-b text-center">{user.email}</td>
                                                <td className="px-4 py-2 border-b text-center">{user.firstName}</td>
                                                <td className="px-4 py-2 border-b text-center">{user.lastName}</td>
                                                <td className="px-4 py-2 border-b text-center">
                                                    {user.isActive ? 'Activo' : 'Inactivo'}
                                                </td>
                                                <td className="px-4 py-2 border-b text-center">
                                                    <button
                                                        onClick={() =>
                                                            handleToggleUserStatus(user.userId, user.isActive)
                                                        }
                                                        className="bg-medium-blue text-white px-4 py-2 rounded hover:bg-medium-blue w-full mb-2"
                                                    >
                                                        {user.isActive ? 'Deshabilitar' : 'Habilitar'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteUser(user.userId)}
                                                        className="bg-dark-blue text-white px-4 py-2 rounded hover:bg-dark-blue w-full"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
            </main>
        </>
    );
};

export default AdminListUsers;