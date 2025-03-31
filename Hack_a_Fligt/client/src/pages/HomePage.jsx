import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useRatingList from '../hooks/useRatingList';
import SearchForm from '../components/SearchForm';
//import CarouselImages from '../components/CarouselImages';
import RecentSearches from '../components/RecentSearches';
import PopularDestinations from '../components/PopularDestinations';
import Header from '../components/Header';
<<<<<<< HEAD
import LogoAnimation from '../components/LogoAnimation';
//import PaperPlaneAnimation from '../components/PaperPlaneAnimation';
import CarouselImages from '../components/CarouselImages';
import { AuthContext } from '../contexts/AuthContext';
=======
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
import RatingsSummary from '../components/RatingsSummary';
import { AuthContext } from '../contexts/AuthContext';

// Obtenemos las variables de entorno
const { VITE_API_URL } = import.meta.env;

// Página de inicio
const HomePage = () => {
<<<<<<< HEAD
    const [ tipoViaje, setTipoViaje ] = useState( 'ida' );
    const [ fechaSalida, setFechaSalida ] = useState( '' );
    const [ fechaRetorno, setFechaRetorno ] = useState( '' );
    const [ origen, setOrigen ] = useState( '' );
    const [ destino, setDestino ] = useState( '' );
    const [ pasajeros, setPasajeros ] = useState( 1 );
    const [ popularDestinations, setPopularDestinations ] = useState( [] );
    const [ recentSearches, setRecentSearches ] = useState( [] );
    const [ loading, setLoading ] = useState( false );
    const [ error, setError ] = useState( null );
    const [ suggestions, setSuggestions ] = useState( [] );
=======
    // Estados para la búsqueda
    const [tipoViaje, setTipoViaje] = useState('ida-vuelta');
    const [fechaSalida, setFechaSalida] = useState('');
    const [fechaRetorno, setFechaRetorno] = useState('');
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [pasajeros, setPasajeros] = useState(1);
    const [suggestions, setSuggestions] = useState([]);
    // Estados para destinos populares y busquedas recientes
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1

    const [recentSearches, setRecentSearches] = useState([]);
    // Estadis de carga y error
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [opacity, setOpacity] = useState(0.2);
    // Hook para navegar entre rutas
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const { ratings } = useRatingList();

<<<<<<< HEAD
    // Hook para cargar las búsqueda populares
    //mas adelante podemos sacrar el dato real de la tabla de búsquedas guardadas
    useEffect( () => {
        // Simulamos la obtención de las búsquedas más realizadas
        const allSearches = JSON.parse( localStorage.getItem( 'recentSearches' ) || '[]' );

        // Contamos la frecuencia de cada búsqueda
        const searchFrequency = allSearches.reduce( ( acc, search ) => {
            const key = `${ search.origen }-${ search.destino }`;
            acc[ key ] = ( acc[ key ] || 0 ) + 1;
            return acc;
        }, {} );

        // Ordenamos las búsquedas por frecuencia y seleccionamos las 3 más frecuentes
        const sortedSearches = Object.entries( searchFrequency )
            .sort( ( a, b ) => b[ 1 ] - a[ 1 ] )
            .slice( 0, 3 )
            .map( ( [ key ] ) => {
                const [ origen, destino ] = key.split( '-' );
                return { origen, destino };
            } );

        setPopularDestinations( sortedSearches );
    }, [] );

    // Hook para cargar las búsquedas recientes
    const loadRecentSearches = () => {
        const searches = JSON.parse( localStorage.getItem( 'recentSearches' ) || '[]' );
        setRecentSearches( searches );
    };
=======
    useEffect(() => {
        const handleScroll = () => {
            console.log('scrollY:', window.scrollY);
            if (window.scrollY > 0) {
                setOpacity(1);
            } else {
                setOpacity(0.4);
            }
        };
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    // Hook para cargar las búsquedas recientes si se está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            const searches = JSON.parse(
                localStorage.getItem('recentSearches') || '[]',
            );
            setRecentSearches(searches);
        }
    }, [isAuthenticated]);

    // Función para guardar la búsqueda reciente
    const saveRecentSearch = (search) => {
        const searches = JSON.parse(
            localStorage.getItem('recentSearches') || '[]',
        );
        searches.unshift(search);
        if (searches.length > 5) searches.pop();
        localStorage.setItem('recentSearches', JSON.stringify(searches));
        setRecentSearches(searches);
    };
    // Función para buscar vuelos
    const fetchFlights = async (params) => {
        try {
            const res = await fetch(
                `${VITE_API_URL}/api/flights/search?${params.toString()}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                },
            );

            // Si la respuesta no es correcta, lanzamos un error
            if (!res.ok) throw new Error('Network response was not ok');
            const body = await res.json();
            if (body.status === 'error') throw new Error(body.message);

            // Devolvemos los vuelos
            return Array.isArray(body) ? body : [];
        } catch (error) {
            // Si hay un error, lo lanzamos
            console.error('Error fetching flights:', error);
            throw error;
        }
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // si el tipo de viaje es de ida y vuelta, comprobamos que la fecha de retorno sea posterior a la de salida
        if (
            tipoViaje === 'ida-vuelta' &&
            new Date(fechaRetorno) < new Date(fechaSalida)
        ) {
            setError(
                'La fecha de retorno no puede ser anterior a la de salida',
            );
            setLoading(false);
            return;
        }

        try {
            // Creamos los parámetros de búsqueda
            const searchParams = new URLSearchParams({
                origin: origen,
                destination: destino,
                departureDate: fechaSalida,
                adults: pasajeros,
            });

            //si el tipo de viaje es de ida y vuelta, añadimos la fecha de retorno
            if (tipoViaje === 'ida-vuelta' && fechaRetorno) {
                searchParams.append('returnDate', fechaRetorno);
            }

            // obtenemos los vuelos
            const flights = await fetchFlights(searchParams);

            // si el tipo de viaje es de ida y vuelta, buscamos los vuelos de vuelta
            if (tipoViaje === 'ida-vuelta' && fechaRetorno) {
                const searchParamsVuelta = new URLSearchParams({
                    origin: origen,
                    destination: destino,
                    departureDate: fechaSalida,
                    returnDate: fechaRetorno,
                    adults: pasajeros,
                });

                const returnFlights = await fetchFlights(searchParamsVuelta);
                flights.push(
                    ...returnFlights.map((flight) => ({
                        ...flight,
                        isReturn: true,
                    })),
                );
            }

            // Navegamos a la página de resultados de búsqueda
            navigate('/search-results', {
                state: {
                    flights,
                    searchParams: {
                        origin: origen,
                        destination: destino,
                        departureDate: fechaSalida,
                        returnDate: fechaRetorno,
                        adults: pasajeros,
                        tipoViaje,
                    },
                },
            });
            saveRecentSearch({
                origen,
                destino,
                fechaSalida,
                fechaRetorno,
                pasajeros,
                tipoViaje,
            });
        } catch (err) {
            console.error('Error al buscar vuelos:', err);
            toast.error(
                err.message ||
                    'Error al buscar vuelos, inténtelo de nuevo más tarde.',
            );
        } finally {
            setLoading(false);
        }
    };

    // Función para repetir una búsqueda reciente
    const handleRepeatSearch = (search) => {
        setOrigen(search.origen);
        setDestino(search.destino);
        setFechaSalida(search.fechaSalida);
        setFechaRetorno(search.fechaRetorno);
        setPasajeros(search.pasajeros);
        setTipoViaje(search.tipoViaje);
        handleSubmit(new Event('submit', { bubbles: true, cancelable: true }));
    };

    // Función para guardar una búsqueda como favorita
    const handleSaveFavorite = (search) => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        favorites.unshift(search);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    // Renderizamos el componente
    return (
<<<<<<< HEAD
        <>
            <main className='bg-light-blue'>
                <LogoAnimation />
                <Header />
                <section className='relative h-[60vh] inset-0 items-center justify-center align-middle flex flex-col'>
                    {/* CarouselImages como fondo */}
                    <CarouselImages className="absolute inset-0 w-full h-full object-cover z-10" />
                    <section className='absolute flex items-center justify-center bottom-60 z-20'>
                        <SearchForm
                            tipoViaje={tipoViaje}
                            fechaSalida={fechaSalida}
                            fechaRetorno={fechaRetorno}
                            origen={origen}
                            destino={destino}
                            pasajeros={pasajeros}
                            setTipoViaje={setTipoViaje}
                            setFechaSalida={setFechaSalida}
                            setFechaRetorno={setFechaRetorno}
                            setOrigen={setOrigen}
                            setDestino={setDestino}
                            setPasajeros={setPasajeros}
                            handleSubmit={handleSubmit}
                            suggestions={suggestions}
                            setSuggestions={setSuggestions}
                        />
                        {/* Mostramos un mensaje de carga si está cargando */}
                        {loading && (
                            <section className='absolute text-center top-56 z-30'>
                                <section className='w-24 h-24 border-8 border-dashed rounded-full animate-spin border-white mx-auto my-10'></section>
                                <h2 className='text-white text-3xl font-bold'>
                                    Loading...
                                </h2>
                                <br></br>
                                <p className='text-white text-3xl font-semibold'>
                                    Your adventure is about to begin!!
                                </p>
                            </section>
                        )}
                    </section>
                    {/* Mostramos un mensaje de error si hay uno */}
                    {error && <p className='text-red-500 text-center'>{error}</p>}
                </section>
                {/* Mostramos las búsquedas recientes si está autenticado */}
                {isAuthenticated && (
                    <RecentSearches
                        recentSearches={recentSearches}
                        onRepeatSearch={handleRepeatSearch}
                        onSaveFavorite={handleSaveFavorite}
=======
        <main className='min-h-screen bg-gradient-to-b from-dark-blue to-white'>
            
            <Header className='sticky' />

            <section className='relative flex flex-col items-center justify-center p-4 mt-16'>
                <div className='bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-5xl relative z-20 hover:scale-[1.008]'>
                    <h1 className='mb-6 text-3xl sm:text-4xl font-heading font-light text-dark-blue text-center'>
                        ¡HACKEA TU VUELO!
                    </h1>
                    <SearchForm
                        tipoViaje={tipoViaje}
                        fechaSalida={fechaSalida}
                        fechaRetorno={fechaRetorno}
                        origen={origen}
                        destino={destino}
                        pasajeros={pasajeros}
                        setTipoViaje={setTipoViaje}
                        setFechaSalida={setFechaSalida}
                        setFechaRetorno={setFechaRetorno}
                        setOrigen={setOrigen}
                        setDestino={setDestino}
                        setPasajeros={setPasajeros}
                        handleSubmit={handleSubmit}
                        suggestions={suggestions}
                        setSuggestions={setSuggestions}
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
                    />
                </div>
                {/* Mostramos un mensaje de carga si está cargando */}
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
<<<<<<< HEAD
                {/* Mostramos los destinos populares y el resumen de calificaciones */}
                <section>
                    <PopularDestinations popularDestinations={popularDestinations} />
                    <RatingsSummary ratings={ratings} />
                </section>
            </main>
        </>
=======
            </section>
            {/* Mostramos un mensaje de error si hay uno */}
            {error && (
                <p className='text-red-500 text-center my-4 font-body'>
                    {error}
                </p>
            )}
            {/* Mostramos las búsquedas recientes si está autenticado */}
            {isAuthenticated && (
                <RecentSearches
                    recentSearches={recentSearches}
                    onRepeatSearch={handleRepeatSearch}
                    onSaveFavorite={handleSaveFavorite}
                />
            )}
            {/* Mostramos los destinos populares y el resumen de calificaciones */}
            <section
                className='px-4 py-12'
                style={{ opacity, transition: 'opacity 0.7s ease-in-out' }}
            >
                <div className='w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div className='bg-white p-6 rounded-lg shadow-md hover:scale-[1.008]'>
                        <PopularDestinations />
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-md hover:scale-[1.008]'>
                        <RatingsSummary ratings={ratings} />
                    </div>
                </div>
            </section>
        </main>
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
    );
};

export default HomePage;
