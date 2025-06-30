"use client";
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import VideoSource from '../../../public/assets/videos/Portals.webm';


export default function Menu()  {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.30;
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-4/5 bg-[#000000]">
      <div className="flex flex-col items-center justify-center z-0 inset-0 absolute">
        <video ref={videoRef} autoPlay muted className='w-full h-full object-cover'>
          <source src={VideoSource} type="video/webm" />
        </video>
      </div>
      <div className="absolute text-center flex flex-col items-center justify-center top-24">
        <h1 className="text-4xl font-extrabold text-[#8653a8]">Bienvenido a la sala de los portales!!</h1>
        <p className="text-lg text-[#fddbff] w-1/2">Desde esta sala puedes acceder a diferentes portales y explorar nuevas dimensiones en busca de "la Espada del Destino" capaz de traer la paz al multiverso y felicidad a sus habitantes.</p>
        <span className="mt-4 text-[#fddbff] text-lg">Pulsa en un portal para continuar tu aventura</span>
      </div>
      <div className="absolute bottom-1/2  flex space-x-54 items-center justify-center">
        <img src="/assets/images/arrow1.png" alt="Flecha" className="w-24 h-24 rotate-180 top-40 relative" />
        <div className="Portal flex flex-col items-center justify-center">
        <p className="text-[#812286] text-xl font-black text-center justify-around items-center relative bottom-6">Portal del Lago <br/><span>(Proyectos)</span></p>
        </div>
        <img src="/assets/images/arrow1.png" alt="Flecha" className="w-24 h-24 top-40 relative" />
      </div>
    </div>
  );
}
