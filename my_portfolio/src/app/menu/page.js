"use client";
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import VideoSource from '../../../public/assets/videos/Portals.webm';
import DPortalSource from '../../../public/assets/videos/DPortal.webm';
import IPortalSource from '../../../public/assets/videos/IPortal.webm';


export default function Menu()  {
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(VideoSource);
  const [currentPortal, setCurrentPortal] = useState("main"); // "main", "derecho", "izquierdo"

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.30;
    }
  }, []);

  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  const playPortalVideo = (portal) => {
    // Cambiar el video según el portal seleccionado
    if (portal === "derecho") {
      setCurrentVideo(DPortalSource);
      setCurrentPortal("derecho");
    } else if (portal === "izquierdo") {
      setCurrentVideo(IPortalSource);
      setCurrentPortal("izquierdo");
    } else if (portal === "main") {
      setCurrentVideo(VideoSource);
      setCurrentPortal("main");
    }
    
    setVideoEnded(false); // Ocultar los textos y flechas mientras se reproduce el video
    
    // Reiniciar reproducción del video
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  // Renderizado condicional según el portal actual
  const renderPortalContent = () => {
    switch (currentPortal) {
      case "main":
        return (
          <>
            <div className="absolute text-center flex flex-col items-center justify-center top-24">
              <h1 className="text-4xl font-extrabold text-[#8653a8]">Bienvenido a la sala de los portales!!</h1>
              <p className="text-lg text-[#fddbff] w-1/2">Desde esta sala puedes acceder a diferentes portales y explorar nuevas dimensiones en busca de "la Espada del Destino" capaz de traer la paz al multiverso y felicidad a sus habitantes.</p>
              <span className="mt-4 text-[#fddbff] text-lg">Pulsa en un portal para continuar tu aventura</span>
            </div>
            <div className="absolute bottom-1/2 flex space-x-54 items-center justify-center">
              <img 
                src="/assets/images/arrow1.png" 
                alt="Flecha Izquierda" 
                className="w-24 h-24 rotate-180 top-40 relative cursor-pointer" 
                onClick={() => playPortalVideo("izquierdo")}
              />
              <div className="Portal flex flex-col items-center justify-center">
                <p className="text-[#812286] text-xl font-black text-center justify-around items-center relative bottom-6">Portal del Lago <br/><span>(Proyectos)</span></p>
              </div>
              <img 
                src="/assets/images/arrow1.png" 
                alt="Flecha Derecha" 
                className="w-24 h-24 top-40 relative cursor-pointer" 
                onClick={() => playPortalVideo("derecho")}
              />
            </div>
          </>
        );
      
      case "derecho":
        return (
          <>
            <div className="absolute text-center flex flex-col items-center justify-center top-24">
              <h1 className="text-4xl font-extrabold text-[#8653a8]">Portal Derecho - Dimensión de Proyectos</h1>
              <p className="text-lg text-[#fddbff] w-1/2">Has llegado a la dimensión de los proyectos. Aquí podrás explorar todos mis desarrollos y creaciones.</p>
              <span className="mt-4 text-[#fddbff] text-lg">Puedes volver al portal principal o continuar explorando</span>
            </div>
            <div className="absolute bottom-1/2 flex space-x-54 items-center justify-center">
              <img 
                src="/assets/images/arrow1.png" 
                alt="Volver" 
                className="w-24 h-24 rotate-180 top-40 relative cursor-pointer" 
                onClick={() => playPortalVideo("main")}
              />
              <div className="Portal flex flex-col items-center justify-center">
                <p className="text-[#812286] text-xl font-black text-center justify-around items-center relative bottom-6">Portal Dimensión <br/><span>(Proyectos)</span></p>
              </div>
            </div>
          </>
        );
      
      case "izquierdo":
        return (
          <>
            <div className="absolute text-center flex flex-col items-center justify-center top-24">
              <h1 className="text-4xl font-extrabold text-[#8653a8]">Portal Izquierdo - Dimensión del Conocimiento</h1>
              <p className="text-lg text-[#fddbff] w-1/2">Has llegado a la dimensión del conocimiento. Aquí podrás conocer más sobre mis habilidades y experiencia.</p>
              <span className="mt-4 text-[#fddbff] text-lg">Puedes volver al portal principal o explorar mis habilidades</span>
            </div>
            <div className="absolute bottom-1/2 flex space-x-54 items-center justify-center">
              <div className="Portal flex flex-col items-center justify-center">
                <p className="text-[#812286] text-xl font-black text-center justify-around items-center relative bottom-6">Portal Dimensión <br/><span>(Conocimiento)</span></p>
              </div>
              <img 
                src="/assets/images/arrow1.png" 
                alt="Volver" 
                className="w-24 h-24 top-40 relative cursor-pointer" 
                onClick={() => playPortalVideo("main")}
              />
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-4/5 bg-[#000000]">
      <div className="flex flex-col items-center justify-center z-0 inset-0 absolute">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          onEnded={handleVideoEnded}
          className='w-full h-full object-cover'
        >
          <source src={currentVideo} type="video/webm" />
        </video>
      </div>
      
      {videoEnded && renderPortalContent()}
    </div>
  );
}
