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
        </section>
    );
};

export default PopularDestinations;
