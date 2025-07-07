"use client";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Lab from "../../../public/videos/Lab.webm";
import Ancient from "@/components/Ancient";
import Image from "next/image";

export default function Page () {
  const [ videoSpeed, setVideoSpeed ] = useState( 0.6 );
  const [ videoLoaded, setVideoLoaded ] = useState( false );
  const [ isEnded, setIsEnded ] = useState( false );
  const [ fadeIn, setFadeIn ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ transitionActive, setTransitionActive ] = useState(false);

  const videoRef = useRef( null );

  // Datos para los diferentes pergaminos
  const scrollContents = [
    {
      title: "Pergamino 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      title: "Pergamino 2",
      content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      title: "Pergamino 3",
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
    }
  ];

  // Función para cambiar de página
  const changePage = (direction) => {
    setTransitionActive(true);
    
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentPage(prev => (prev + 1) % scrollContents.length);
      } else {
        setCurrentPage(prev => (prev - 1 + scrollContents.length) % scrollContents.length);
      }
      
      setTimeout(() => {
        setTransitionActive(false);
      }, 50);
    }, 500);
  };

  // Función para cambiar a una página específica
  const goToPage = (pageIndex) => {
    if (currentPage === pageIndex) return;
    
    setTransitionActive(true);
    
    setTimeout(() => {
      setCurrentPage(pageIndex);
      
      setTimeout(() => {
        setTransitionActive(false);
      }, 50);
    }, 500);
  };

  useEffect( () => {
    const video = videoRef.current;
    if ( video )
    {
      video.playbackRate = videoSpeed;
    }
  }, [ videoSpeed ] );

  useEffect( () => {
    const video = videoRef.current;
    if ( video )
    {
      video.addEventListener( "canplaythrough", () => {
        setVideoLoaded( true );
      } );
      video.addEventListener( "ended", () => {
        setIsEnded( true );
        // Pequeño retraso antes de iniciar la animación de entrada
        setTimeout(() => setFadeIn(true), 200);
      } );
    }
    return () => {
      if ( video )
      {
        video.removeEventListener( "canplaythrough", () => { } );
        video.removeEventListener( "ended", () => { } );
      }
    };
  }, [] );

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="cover absolute inset-0 z-0">
        <video
          autoPlay
          muted
          className="w-full h-full object-cover"
          ref={videoRef}
        >
          <source src={Lab} type="video/webm" />
          Tu navegador no soporta el elemento video.
        </video>
      </div>
      <div className="relative z-10">
        <div className="opacity-80">
          <Header />
        </div>
        {isEnded && (
          <div 
            className="transition-all duration-1500 ease-in-out"
            style={{ 
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="relative">
              
              {/* Indicador de página */}
              <div className="flex justify-center gap-2">
                {scrollContents.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`h-6 w-6 rounded-full mt-4 cursor-pointer transition-all duration-300 hover:scale-115 
                    ${currentPage === index ? 'bg-fuchsia-500' : 'bg-fuchsia-800/50'}`}
                    aria-label={`Ir a pergamino ${index + 1}`}
                  />
                ))}
              </div>
              
              <Ancient
                title={scrollContents[currentPage].title}
                content={scrollContents[currentPage].content}
                className={`transition-opacity duration-500 ${transitionActive ? 'opacity-0' : 'opacity-100'}`}
              />
              
              {/* Flechas de navegación */}
              <div className="flex justify-around w-full absolute top-1/2 -translate-y-1/2 px-4">
                <button 
                  onClick={() => changePage('prev')}
                  className="bg-amber-800/60 hover:bg-amber-700/80 hover:scale-125 p-3 rounded-full transition-all"
                  aria-label="Pergamino anterior"
                >
                  <div className="w-12 h-12 relative transform rotate-180">
                    <Image 
                      src="/assets/arrow2.png" 
                      alt="Flecha izquierda" 
                      fill
                      className="object-contain"
                    />
                  </div>
                </button>
                <button 
                  onClick={() => changePage('next')}
                  className="bg-amber-800/60 hover:bg-amber-700/80 hover:scale-125 p-3 rounded-full transition-all"
                  aria-label="Siguiente pergamino"
                >
                  <div className="w-12 h-12 relative">
                    <Image 
                      src="/assets/arrow2.png" 
                      alt="Flecha derecha" 
                      fill
                      className="object-contain"
                    />
                  </div>
                </button>
              </div>
              
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}