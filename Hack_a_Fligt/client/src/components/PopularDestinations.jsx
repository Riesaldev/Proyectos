import { useState, useEffect } from 'react';

const PopularDestinations = () => {
    const images = [
        '/public/imagen1.jpg',
        '/public/imagen2.jpg',
        '/public/imagen3.jpg',
        '/public/imagen4.jpg',
        '/public/imagen5.jpg',
        '/public/imagen6.jpg',
        '/public/imagen7.jpg',
        '/public/imagen8.jpg',
        '/public/imagen9.jpg',
    ];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 7000); // tiempo que dura cada imagen 7 segundos
        return () => clearInterval(interval);
    }, [images.length]);

    return (
<<<<<<< HEAD
        <section className="bg-medium-blue text-center h-80 p-4" style={{
            backgroundImage: 'url(./public/ticket.png)', backgroundSize: 'auto',
        }}>
            <h2 className='font-bold italic text-accent-blue underline text-2xl m-6 pt-10'>Destinos Populares</h2>
            {popularDestinations.length > 0 ? (
                popularDestinations.slice( 0, 5 ).map( ( destination, index ) => (
                    <div key={index} className='m-4 p-4 flex-col font-semibold border-2 border-accent-blue bg-dark-blue text-accent-blue rounded-lg inline-block'>
                        <p>Origen: {destination.origen}</p>
                        <p>Destino: {destination.destino}</p>
                    </div>
                ) )
            ) : (
                <p className='text-white'><strong>EJEMPLO:</strong> Madrid - Nueva York, Londres - Tokio, Paris - Londres</p>
            )}
=======
        <section className='my-8 px-0,4'>
            <h2 className='text-3xl font-light text-center text-dark-blue font-heading mb-6'>
                DESTINOS POPULARES
            </h2>
            <div className='relative w-full h-96 overflow-hidden shadow-lg rounded-lg'>
                {images.map((img, index) => (
                    <img
                        key={img}
                        src={img}
                        alt='Destino'
                        className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000
                                ${
                                    index === currentImage
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                }`}
                    />
                ))}
            </div>
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
        </section>
    );
};

export default PopularDestinations;
