import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext.js';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Header from '../components/Header.jsx';
import aircodes from 'aircodes';

const { VITE_API_URL } = import.meta.env;

const FavoriteDetailsEditPage = () => {
    const [ favorites, setFavorite ] = useState( {} );
    const [ loading, setLoading ] = useState( true );
    const [ initialFavorites, setInitialFavorites ] = useState( {} );
    const [ isEditing, setIsEditing ] = useState( false );
    const { favoriteId } = useParams();
    const { authToken, authUser } = useAuthContext();

<<<<<<< HEAD
    const [ originSuggestions, setOriginSuggestions ] = useState( [] );
    const [ destinationSuggestions, setDestinationSuggestions ] = useState( [] );

    // Función para buscar aeropuertos con `aircodes`
    const handleSearch = ( query, setSuggestions ) => {
        if ( query.length < 3 )
        {
            setSuggestions( [] );
            return;
        }

        const results = aircodes.findAirport( query ) || []; // 🔍 Busca aeropuertos por ciudad, país o código IATA

        setSuggestions( results );
=======
    const [originSuggestions, setOriginSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);

    // Función para buscar aeropuertos con `aircodes`
    const handleSearch = (query, setSuggestions) => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        const results = aircodes.findAirport(query) || []; // 🔍 Busca aeropuertos por ciudad, país o código IATA
        setSuggestions(results);
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
    };

    // Obtenemos la lista de favoritos del usuario.
    useEffect( () => {
        const fetchFavorites = async () => {
            try
            {
                const res = await fetch(
                    `${ VITE_API_URL }/api/users/favorites/${ favoriteId }`,
                    {
                        headers: authUser
                            ? {
                                Authorization: authToken,
                            }
                            : {},
                    },
                );
                const body = await res.json();

<<<<<<< HEAD
                // Si hay algún error lo lanzamos.
                if ( body.status === 'error' )
                {
                    throw new Error( body.message );
                }
                setFavorite( body.data.favorites );
                setInitialFavorites( body.data.favorites );

            } catch ( err )
            {
                toast.error( err.message, {
                    id: 'favoriteId',
                } );


            } finally
            {
                setLoading( false );
            }
        };

        if ( authToken && authUser )
        { // Solo ejecuta si existen
            fetchFavorites();
        }
    }, [ favoriteId, authToken, authUser ] );

    //Guardamos los cambios realizados en el favorito.
    const handleSave = async () => {
        try
        {
            if ( !favorites.origin || !favorites.destination || !favorites.departureDate || favorites.adults <= 0 || !Date.parse( favorites.departureDate ) || ( favorites.returnDate && isNaN( Date.parse( favorites.returnDate ) ) ) )
            {
                throw new Error( "Campos vacios" );
            }

            const formattedFavorites = {
                title: favorites.title,
                origin: favorites.origin,
                destination: favorites.destination,
                departureDate: formatDate( favorites.departureDate ),
                returnDate: favorites.returnDate ? formatDate( favorites.returnDate ) : null,
                adults: favorites.adults,
            };
            // Enviamos los cambios al endpoint de actualización de favoritos.
            const res = await fetch(
                `${ VITE_API_URL }/api/users/favorites/${ favoriteId }`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
                    },
                    body: JSON.stringify( formattedFavorites ),
                },
            );
            // Obtenemos el body.
            const body = await res.json();
            setIsEditing( false );
            toast.success( body.message );
        } catch ( err )
        {
            toast.error( err.message, {
                id: 'favoriteId',
            } );


        }
    };

    //Toggle para permitir editar un favorito.
    const handleEditToggle = () => setIsEditing( !isEditing );

    //Cambiamos el valor de un input al editar un favorito.
    const handleChange = ( e ) => {
        setFavorite( {
=======
                if (body.status === 'error') {
                    throw new Error(body.message);
                }
                setFavorite(body.data.favorites);
                setInitialFavorites(body.data.favorites);
            } catch (err) {
                toast.error(err.message, {
                    id: 'favoriteId',
                });
            } finally {
                setLoading(false);
            }
        };

        if (authToken && authUser) {
            fetchFavorites();
        }
    }, [favoriteId, authToken, authUser]);

    // Guardamos los cambios realizados en el favorito.
    const handleSave = async () => {
        try {
            if (!favorites.origin || !favorites.destination || !favorites.departureDate || favorites.adults <= 0 || !Date.parse(favorites.departureDate) || (favorites.returnDate && isNaN(Date.parse(favorites.returnDate)))) {
                throw new Error("Campos vacíos");
            }

            const formattedFavorites = {
                title: favorites.title,
                origin: favorites.origin,
                destination: favorites.destination,
                departureDate: formatDate(favorites.departureDate),
                returnDate: favorites.returnDate ? formatDate(favorites.returnDate) : null,
                adults: favorites.adults,
            };

            const res = await fetch(
                `${VITE_API_URL}/api/users/favorites/${favoriteId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
                    },
                    body: JSON.stringify(formattedFavorites),
                },
            );
            const body = await res.json();
            setIsEditing(false);
            toast.success(body.message);
        } catch (err) {
            toast.error(err.message, {
                id: 'favoriteId',
            });
        }
    };

    // Toggle para permitir editar un favorito.
    const handleEditToggle = () => setIsEditing(!isEditing);

    // Cambiamos el valor de un input al editar un favorito.
    const handleChange = (e) => {
        setFavorite({
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
            ...favorites,
            [ e.target.name ]: e.target.value,
        } );
    };

<<<<<<< HEAD
    //Formato de la fecha para que pueda ser enviada al endpoint de actualización de favoritos.
    const formatDate = ( date ) => {
        if ( !date ) return null; // Si la fecha es null, no la formateamos
        const newDate = new Date( date );
        return newDate.toISOString().split( 'T' )[ 0 ]; // Devuelve solo la parte de la fecha (sin hora)
=======
    // Formato de la fecha para que pueda ser enviada al endpoint de actualización de favoritos.
    const formatDate = (date) => {
        if (!date) return null;
        const newDate = new Date(date);
        return newDate.toISOString().split('T')[0]; // Devuelve solo la parte de la fecha (sin hora)
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
    };

    // Buscamos el vuelo favorito del usuario
    const navigate = useNavigate();

<<<<<<< HEAD

    const handleFavoriteSearch = async ( favorites ) => {
        try
        {
            setLoading( true );
            const searchParams = new URLSearchParams( {
=======
    const handleFavoriteSearch = async (favorites) => {
        try {
            setLoading(true);
            const searchParams = new URLSearchParams({
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
                origin: favorites.origin,
                destination: favorites.destination,
                departureDate: formatDate( favorites.departureDate ),
                adults: favorites.adults,
<<<<<<< HEAD
            } );

            if ( favorites.returnDate )
            {
                searchParams.append( 'returnDate', formatDate( favorites.returnDate ) );
            }

            // Hacer la petición directamente a la API de vuelos
            const res = await fetch( `${ VITE_API_URL }/api/flights/search?${ searchParams.toString() }` );
            const body = await res.json();
            console.log( searchParams.toString() );

            if ( !res.ok || body.status === 'error' )
            {
                throw new Error( body.message || 'Error al obtener los vuelos' );
=======
            });

            if (favorites.returnDate) {
                searchParams.append('returnDate', formatDate(favorites.returnDate));
            }

            const res = await fetch(`${VITE_API_URL}/api/flights/search?${searchParams.toString()}`);
            const body = await res.json();

            if (!res.ok || body.status === 'error') {
                throw new Error(body.message || 'Error al obtener los vuelos');
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
            }

            const flights = body || [];

<<<<<<< HEAD
            // 🛫 Si es ida y vuelta, obtener también los vuelos de regreso
            let returnFlights = [];
            if ( favorites.returnDate )
            {
                const searchParamsVuelta = new URLSearchParams( {
                    origin: favorites.destination,
                    destination: favorites.origin,
                    departureDate: formatDate( favorites.departureDate ),
                    adults: favorites.adults,
                } );

                const resVuelta = await fetch( `${ VITE_API_URL }/api/flights/search?${ searchParamsVuelta.toString() }` );
                const bodyVuelta = await resVuelta.json();

                if ( resVuelta.ok && bodyVuelta.length > 0 )
                {
                    returnFlights = bodyVuelta.map( ( flight ) => ( { ...flight, isReturn: true } ) );
                }
            }


            //Envia los datos del favorito para mostrar los vuelos directamente
            navigate( '/search-results', {
=======
            let returnFlights = [];
            if (favorites.returnDate) {
                const searchParamsVuelta = new URLSearchParams({
                    origin: favorites.destination,
                    destination: favorites.origin,
                    departureDate: formatDate(favorites.departureDate),
                    adults: favorites.adults,
                });

                const resVuelta = await fetch(`${VITE_API_URL}/api/flights/search?${searchParamsVuelta.toString()}`);
                const bodyVuelta = await resVuelta.json();

                if (resVuelta.ok && bodyVuelta.length > 0) {
                    returnFlights = bodyVuelta.map((flight) => ({ ...flight, isReturn: true }));
                }
            }
            navigate('/search-results', {
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
                state: {
                    flights: [ ...flights, ...returnFlights ],
                    searchParams: {
                        origin: favorites.origin,
                        destination: favorites.destination,
                        departureDate: favorites.departureDate,
                        returnDate: favorites.returnDate || null,
                        adults: favorites.adults,
                        tipoViaje: favorites.returnDate ? 'ida-vuelta' : 'ida',
                    },
                },
<<<<<<< HEAD
            } );
        } catch ( err )
        {
            console.error( 'Error al buscar vuelos:', err );
            toast.error( 'Error al buscar vuelos, inténtelo de nuevo más tarde.' );
        } finally
        {
            setLoading( false );
=======
            });
            setLoading(false);
        } catch (err) {
            console.error('Error al buscar vuelos:', err);
            toast.error(err.message || 'Error al buscar vuelos, inténtelo de nuevo más tarde.');
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
        }
    };

    const handleCancel = () => {
        setFavorite( initialFavorites ); // Restauramos el estado inicial
        setIsEditing( false ); // Dejamos de editar
    };
<<<<<<< HEAD

    if ( loading ) return <LogoAnimation />;

    // Mostramos la lista de favoritos.
=======
    
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
    return (
        <>
         {loading && (
                    <div className='fixed inset-0 bg-dark-blue bg-opacity-90 flex items-center justify-center z-50'>
                        <div className='bg-white p-8 rounded-md shadow-lg max-w-xs mx-auto'>
                            <div className='w-16 h-16 border-8 border-dark-blue border-dashed rounded-full animate-spin mx-auto mb-4'></div>
                            <h2 className='text-dark-blue text-2xl font-bold text-center'>
                                Cargando...
                            </h2>
                            <p className='text-dark-blue text-center mt-2'>
                                hackeando tu vuelo...
                            </p>
                        </div>
                    </div>
                )}
            <Header />
<<<<<<< HEAD
            <main className='bg-light-blue min-h-screen p-8 rounded-lg shadow-md w-full max-w-lg mx-auto mt-10 mb-10'>
                <h2 className='text-center text-dark-blue text-3xl mb-6'>
                    Detalles del Favorito
                </h2>
=======
                    {/* Animación de carga sobrepuesta */}
        {loading && (
            <div className='fixed inset-0 bg-dark-blue bg-opacity-90 flex items-center justify-center z-50'>
                <div className='bg-white p-8 rounded-md shadow-lg max-w-xs mx-auto'>
                    <div className='w-16 h-16 border-8 border-dark-blue border-dashed rounded-full animate-spin mx-auto mb-4'></div>
                    <h2 className='text-dark-blue text-2xl font-bold text-center'>
                        Cargando...
                    </h2>
                    <p className='text-dark-blue text-center mt-2'>
                        Hackeando tu vuelo...
                    </p>
                </div>
            </div>
        )}
            <main className="bg-light-blue p-8 rounded-lg shadow-md w-full max-w-lg mx-auto mt-10 mb-20">
                <h2 className="text-center text-dark-blue text-3xl mb-6">Detalles del Favorito</h2>
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
                <form>
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-base font-medium text-dark-blue mb-2">
                            Titulo
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={favorites.title || ''}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-medium-blue focus:outline-none"
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label htmlFor="origin" className="block text-base font-medium text-dark-blue mb-2">
                            Origen
                        </label>
                        <input
                            type="text"
                            name="origin"
                            value={favorites.origin || ''}
                            onChange={( e ) => {
                                handleChange( e );
                                handleSearch( e.target.value, setOriginSuggestions );
                            }}
                            readOnly={!isEditing}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-medium-blue focus:outline-none"
                        />
                        {originSuggestions.length > 0 && (
<<<<<<< HEAD
                            <ul className='absolute top-full bg-white text-black border border-gray-300 .w-auto max-h-48 overflow-y-auto rounded-md shadow-md z-10'>
                                {originSuggestions.map( ( airport ) => (
=======
                            <ul className="absolute top-full bg-white text-black border border-gray-300 max-h-48 overflow-y-auto rounded-md shadow-md z-10">
                                {originSuggestions.map((airport) => (
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
                                    <li
                                        key={airport.iata}
                                        className="p-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => {
                                            setFavorite( { ...favorites, origin: airport.iata } );
                                            setOriginSuggestions( [] ); // Ocultar las sugerencias
                                        }}
                                    >
                                        {airport.city} - {airport.name} ({airport.iata})
                                    </li>
                                ) )}
                            </ul>
                        )}
                    </div>

                    {/* Destino */}
                    <div className="mb-6 relative">
                        <label htmlFor="destination" className="block text-base font-medium text-dark-blue mb-2">
                            Destino
                        </label>
                        <input
                            type="text"
                            name="destination"
                            value={favorites.destination || ''}
                            onChange={( e ) => {
                                handleChange( e );
                                handleSearch( e.target.value, setDestinationSuggestions );
                            }}
                            readOnly={!isEditing}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-medium-blue focus:outline-none"
                        />
                        {destinationSuggestions.length > 0 && (
<<<<<<< HEAD
                            <ul className='absolute top-full bg-white text-black border border-gray-300 .w-auto max-h-48 overflow-y-auto rounded-md shadow-md'>
                                {destinationSuggestions.map( ( airport ) => (
=======
                            <ul className="absolute top-full bg-white text-black border border-gray-300 max-h-48 overflow-y-auto rounded-md shadow-md">
                                {destinationSuggestions.map((airport) => (
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
                                    <li
                                        key={airport.iata}
                                        className="p-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => {
                                            setFavorite( { ...favorites, destination: airport.iata } );
                                            setDestinationSuggestions( [] ); // Ocultar las sugerencias
                                        }}
                                    >
                                        {airport.city} - {airport.name} ({airport.iata})
                                    </li>
                                ) )}
                            </ul>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="departureDate" className="block text-base font-medium text-dark-blue mb-2">
                            Fecha de Salida
                        </label>
                        <input
<<<<<<< HEAD
                            type='date'
                            name='departureDate'
                            value={
                                favorites?.departureDate
                                    ? new Date( favorites.departureDate )
                                        .toISOString()
                                        .split( 'T' )[ 0 ]
                                    : ''
                            }
=======
                            type="date"
                            name="departureDate"
                            value={favorites?.departureDate ? new Date(favorites.departureDate).toISOString().split('T')[0] : ''}
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            readOnly={!isEditing}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-medium-blue focus:outline-none"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="returnDate" className="block text-base font-medium text-dark-blue mb-2">
                            Fecha de Regreso
                        </label>
                        <input
<<<<<<< HEAD
                            type='date'
                            name='returnDate'
                            value={
                                favorites?.returnDate
                                    ? new Date( favorites.returnDate )
                                        .toISOString()
                                        .split( 'T' )[ 0 ]
                                    : ''
                            }
=======
                            type="date"
                            name="returnDate"
                            value={favorites?.returnDate ? new Date(favorites.returnDate).toISOString().split('T')[0] : ''}
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
                            onChange={handleChange}
                            readOnly={!isEditing}
                            min={favorites.departureDate ? new Date(favorites.departureDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-medium-blue focus:outline-none"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="adults" className="block text-base font-medium text-dark-blue mb-2">
                            Adultos
                        </label>
                        <input
                            type="number"
                            name="adults"
                            value={favorites.adults || 1}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-medium-blue focus:outline-none"
                        />
                    </div>
                    {loading && (
                    <div className='fixed inset-0 bg-dark-blue bg-opacity-90 flex items-center justify-center z-50'>
                        <div className='bg-white p-8 rounded-md shadow-lg max-w-xs mx-auto'>
                            <div className='w-16 h-16 border-8 border-dark-blue border-dashed rounded-full animate-spin mx-auto mb-4'></div>
                            <h2 className='text-dark-blue text-2xl font-bold text-center'>
                                Cargando...
                            </h2>
                            <p className='text-dark-blue text-center mt-2'>
                                hackeando tu vuelo...
                            </p>
                        </div>
                    </div>
                )}
                    <div className="flex justify-between items-center">
                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleCancel}
<<<<<<< HEAD
                                className='top-3 relative py-2 px-4 text-accent-blue text-base font-bold overflow-hidden bg-medium-blue rounded-full transition-all duration-400 ease-in-out shadow-lg hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-accent-blue before:to-medium-blue before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                                disabled={!isEditing}
=======
                                className="bg-accent-blue text-white py-2 px-4 rounded-md hover:bg-medium-blue focus:outline-none"
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
                            >
                                Cancelar
                            </button>
                        )}
                        {!isEditing && (
                            <button
                                type="button"
                                onClick={handleEditToggle}
<<<<<<< HEAD
                                className='top-3 relative py-2 px-4 text-accent-blue text-base font-bold overflow-hidden bg-medium-blue rounded-full transition-all duration-400 ease-in-out shadow-lg hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-accent-blue before:to-medium-blue before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
=======
                                className="bg-accent-blue text-white py-2 px-4 rounded-md hover:bg-medium-blue focus:outline-none"
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
                            >
                                Editar
                            </button>
                        )}
                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleSave}
<<<<<<< HEAD
                                className='top-3 relative py-2 px-4 text-accent-blue text-base font-bold overflow-hidden bg-medium-blue rounded-full transition-all duration-400 ease-in-out shadow-lg hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-accent-blue before:to-medium-blue before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
=======
                                className="bg-medium-blue text-white py-2 px-4 rounded-md hover:bg-accent-blue focus:outline-none"
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
                            >
                                Guardar
                            </button>
                        )}
                        <button
                            disabled={isEditing}
<<<<<<< HEAD
                            onClick={() => handleFavoriteSearch( favorites )}
                            className='top-3 relative py-2 px-4 text-accent-blue text-base font-bold overflow-hidden bg-medium-blue rounded-full transition-all duration-400 ease-in-out shadow-lg hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-accent-blue before:to-medium-blue before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
=======
                            onClick={(e) => {
                                e.preventDefault();
                                handleFavoriteSearch(favorites)}}
                            className="bg-light-blue text-dark-blue py-2 px-4 rounded-md hover:bg-accent-blue focus:outline-none"
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
                        >
                            Ver Vuelos
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
};

export default FavoriteDetailsEditPage;
