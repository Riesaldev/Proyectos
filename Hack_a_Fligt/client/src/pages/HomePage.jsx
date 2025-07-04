import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useRatingList from '../hooks/useRatingList';
import SearchForm from '../components/SearchForm';
//import CarouselImages from '../components/CarouselImages';
import RecentSearches from '../components/RecentSearches';
import PopularDestinations from '../components/PopularDestinations';
import Header from '../components/Header';
import LogoAnimation from '../components/LogoAnimation';
//import PaperPlaneAnimation from '../components/PaperPlaneAnimation';
import CarouselImages from '../components/CarouselImages';
import { AuthContext } from '../contexts/AuthContext';

// Obtenemos las variables de entorno
const { VITE_API_URL } = import.meta.env;

// Página de inicio
const HomePage = () => {
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
    const [opacity, setOpacity] = useState(0.2);
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const { ratings } = useRatingList();

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
    // Hook para cargar las búsquedas recientes si se está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            const searches = JSON.parse(
                localStorage.getItem('recentSearches') || '[]',
            );
            setRecentSearches(searches);
        }
    }, [isAuthenticated]);

    // Función para guardar una búsqueda reciente (máximo 5)
    const saveRecentSearch = (search) => {
        let searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        // Evitar duplicados exactos
        searches = searches.filter(
            s =>
                !(
                    s.origen === search.origen &&
                    s.destino === search.destino &&
                    s.fechaSalida === search.fechaSalida &&
                    s.fechaRetorno === search.fechaRetorno &&
                    s.pasajeros === search.pasajeros &&
                    s.tipoViaje === search.tipoViaje
                )
        );
        searches.unshift(search);
        if (searches.length > 5) searches = searches.slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(searches));
        setRecentSearches(searches);
    };
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
    </section>
    {/* Mostramos búsquedas recientes si está autenticado */}
    {isAuthenticated && (
        <RecentSearches
            recentSearches={recentSearches}
            onRepeatSearch={handleRepeatSearch}
            onSaveFavorite={handleSaveFavorite}
        />
    )}
    {/* Mostramos un mensaje de carga si está cargando */}
    {loading && (
        <div className='fixed inset-0 bg-dark-blue bg-opacity-90 flex items-center justify-center z-50'>
            <div className='bg-white p-8 rounded-md shadow-lg max-w-xs mx-auto'>
                <div className='w-16 h-16 border-8 border-dark-blue border-dashed rounded-full animate-spin mx-auto mb-4'></div>
                <h2 className='text-dark-blue text-2xl font-bold text-center'>
                    Cargando...
                </h2>
                <p className='text-dark-blue text-center mt-2'>
                    Por favor, espere mientras buscamos los mejores vuelos para ti.
                </p>
            </div>
        </div>
    )}
</section>
</main>
        </>
    );
};

export default HomePage;
