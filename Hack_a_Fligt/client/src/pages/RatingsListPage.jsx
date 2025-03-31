//Importamos hooks
import { useState } from 'react';
import useRatingList from '../hooks/useRatingList';

//import useAvgRating from '../hooks/useAvgRating';

//importamos componentes
import RatingListItem from '../components/RatingListItem';
import toast from 'react-hot-toast';
import Header from '../components/Header';

//importamos variables de entorno
const { VITE_API_URL } = import.meta.env;

//iniciamos el componente
const RatingsListPage = () => {
    //Obtenemos las valoraciones usando el hook
    const { ratings, setRatings } = useRatingList();

    // Declaramos una variable en el State para cada query param.
    const [ rate, setRate ] = useState( '' );

    //Declaramos una variable en el State para indicar el fetch
    const [ loading, setLoading ] = useState( false );

    //Declaramos una variable en el State para actualizar el listado de valoraciones
    const [ currentPage, setCurrentPage ] = useState( 1 );
    //Definimos cuantas valoraciones queremos mostrar por página
    const ratingsPerPage = 4;

    //Calculamos el índice de la última valoración que se mostrará en la página actual
    const indexOfLastRating = currentPage * ratingsPerPage;
    //Calculamos el índice de la primera valoración que se mostrará en la página actual
    const indexOfFirstRating = indexOfLastRating - ratingsPerPage;

    //Obtenemos las valoraciones que se mostrarán en la página actual
    const currentRatings = ratings.slice( indexOfFirstRating, indexOfLastRating );

    //Si no hay valoraciones, mostramos mensaje de carga
    if ( !ratings.length ) return <p>No hay valoraciones disponibles</p>;

    //Obtenemos la media y el total de las valoraciones
    //const { avgRating, totalRatings } = useAvgRating();

    // Función que maneja el envío del formulario.
    const handleSearchRatings = async ( e ) => {
        try
        {
            //prevenimos el comportamiento por defecto
            e.preventDefault();

            //indicamos el inicio del fetch
            setLoading( true );

            //obtenemos una respuesta
            const res = await fetch(
                `${ VITE_API_URL }/api/ratings?rating=${ rate }`,
            );

            //obtenemos el body
            const body = await res.json();

            //si hay un error lo lanzamos
            if ( body.status === 'error' )
            {
                throw new Error( body.message );
            }

            //Almacenamos las valoraciones en el State a la inversa
            setRatings( body.data.ratings );
        } catch ( err )
        {
            toast.error( err.message );
        } finally
        {
            //indicamos el final del fetch
            setLoading( false );
        }
    };

    //Mostramos las valoraciones
    return (
        <>
            <Header />
<<<<<<< HEAD
            <main className='bg-[#E5F7FF] flex flex-col items-center justify-center min-h-screen p-6 '>
                <section className='bg-white border-2 border-accent-blue p-8 rounded-lg w-full max-w-fit mx-auto'>
                    <h2 className='text-2xl font-bold text-[#083059] text-center mb-6'>
                        Todas las valoraciones
=======
            <main className='bg-gradient-to-b from-dark-blue to-white flex flex-col items-center justify-center min-h-screen p-6 '>
                <section className='bg-white p-8 rounded-lg shadow-md w-full max-w-5xl mx-auto'>
                    <h2 className='text-4xl font-light font-heading text-[#083059] text-center mb-6'>
                        VALORACIONES
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
                    </h2>
                    {/* formulario de búsqueda */}
                    <form
                        onSubmit={handleSearchRatings}
                        className='flex gap-1 items-center mb-6 justify-end'
                    >
                        <select
                            value={rate}
                            onChange={( e ) => setRate( e.target.value )}
                            className='text-[#083059] font-medium p-1'
                        >
                            <option value=''>--Selecciona un valor--</option>
                            <option value='1'>⭐</option>
                            <option value='2'>⭐⭐</option>
                            <option value='3'>⭐⭐⭐</option>
                            <option value='4'>⭐⭐⭐⭐</option>
                            <option value='5'>⭐⭐⭐⭐⭐</option>
                        </select>
                        <button
                            disabled={loading}
                            className='relative py-2 px-4 text-accent-blue text-base font-bold overflow-hidden bg-medium-blue rounded-full transition-all duration-400 ease-in-out shadow-lg hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-accent-blue before:to-medium-blue before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                        >
                            {loading ? 'Filtrando...' : 'Filtrar'}
                        </button>
                    </form>
                    {/* Listado de valoraciones */}
<<<<<<< HEAD
                    <ul className='list-none '>
                        {currentRatings.map( ( rating ) => (
                            <div
                                key={rating.id}
                                className='p-6 mb-4 mt-4 rounded-lg shadow-sm list-none'
                            >
=======
                    <ul className='grid grid-cols-1 md:grid-cols-2 gap-4 list-none '>
                        {currentRatings.map((rating) => (
                            <div key={rating.id} className='p-1 mb-1 mt-1 '>
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
                                <RatingListItem
                                    ratingId={rating.id}
                                    title={rating.title}
                                    rate={rating.rate}
                                    comment={rating.comment}
                                    username={rating.username}
                                    createdAt={rating.createdAt}
                                />
                            </div>
                        ) )}
                    </ul>
                    {/*Botones de la paginación */}
                    <div className='flex justify-center gap-2 mt-6'>
                        {Array.from( {
                            length: Math.ceil( ratings.length / ratingsPerPage ),
                        } ).map( ( _, index ) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage( index + 1 )}
                                className='top-3 relative py-2 px-4 text-accent-blue text-base font-bold overflow-hidden bg-medium-blue rounded-full transition-all duration-400 ease-in-out shadow-lg hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-accent-blue before:to-medium-blue before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                            >
                                {index + 1}
                            </button>
                        ) )}
                    </div>
                </section>
            </main>
        </>
    );
};

export default RatingsListPage;
