import { Button } from '@/components/ui/button';
import { Info, Play } from 'lucide-react';
import React from 'react';

const SliderVideo = () => {
    return (
        <div className="relative w-full -[80vw] md:h-[56.25vw] lg:h-[45vw]">
            <video
                autoPlay
                loop
                muted
                className="brightness-50 object-fill w-full h-[80vw]  md:h-[56.25vw] lg:h-[45vw]"
                src="/video/video-trailer-test.mp4"
            />
            <div className='flex flex-col justify-end absolute w-full md:w-[36%] px-4 md:px-0 md:left-[4%] z-20 top-0 bottom-7 md:bottom-[36%]'>
                <div className='pt-24 md:pt-0'>
                    <h2 className='text-2xl md:text-5xl lg:text-8xl font-bold drop-shadow-xl'>RIESALDEV</h2>
                    <p className='max-w-md mt-2 text-xs md:text-base'>
                        Aprende a crear desde cero tu propia plataforma de streaming como Netflix con todas las funcionalidades claves, desde la gestión de usuarios hasta la reproducción de videos, mientras descubres los secretos detrás de la creación de una plataforma de streaming exitosa.
                    </p>
                    <div className='flex flex-col md:flex-row gap-6 mt-10'>
                        <Button size='lg' variant='secondary' >
                            <Play className='w-6 h-6 mr-2 fill-black' />Reproducir
                        </Button>
                        <Button size='lg' className='bg-gray-500/60 hover:bg-gray-500/30' >
                            <Info className='w-6 h-6 mr-2 ' />
                            Más información
                        </Button>
                    </div>
                </div>
            </div>
            <div className='bg-no-repeat bg-contain w-full opacity-100 top-auto h-[5vw] -bottom-0 absolute bg-gradient-to-b from-transparent to-zinc-900
        ' />
        </div>
    );
}



export default SliderVideo;
