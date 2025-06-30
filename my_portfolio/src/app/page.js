"use client";
import { useState, useRef, useEffect } from "react";
import PreloadPage from "./precarga/PreloadPage";
import LavenderFog from "../components/Three/LavenderFog";
import VideoSource from "../../public/assets/videos/puerta.mp4";

export default function Home () {
  const [ showHome, setShowHome ] = useState( false );
  const [ isExpanded, setIsExpanded ] = useState( false );
  const [ videoRect, setVideoRect ] = useState(null);
  const [ expandAnimation, setExpandAnimation ] = useState(false);
  const videoRef = useRef( null );
  const expandedVideoRef = useRef( null );

  const handleVideoClick = () => {
    if ( videoRef.current ) {
      if ( videoRef.current.paused ) {
        // Obtén la posición y tamaño del video antes de expandir
        const rect = videoRef.current.getBoundingClientRect();
        setVideoRect(rect);
        setIsExpanded(true);
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Efecto para controlar la animación de expansión
  useEffect(() => {
    if (isExpanded && videoRect) {
      // Aplicar la animación después de un pequeño retraso
      setTimeout(() => {
        setExpandAnimation(true);
        if (expandedVideoRef.current) {
          expandedVideoRef.current.play();
        }
      }, 50);
    } else {
      setExpandAnimation(false);
    }
  }, [isExpanded, videoRect]);

  // Estilos iniciales y expandidos
  const initialStyle = videoRect ? {
    position: "fixed",
    left: videoRect.left,
    top: videoRect.top,
    width: videoRect.width,
    height: videoRect.height,
    transition: "all 8s cubic-bezier(0.4,0,0.2,1)",
    zIndex: 100,
  } : {};

  // Combina los estilos según la fase de animación
  const videoWrapperStyle = {
    ...initialStyle,
    ...(expandAnimation ? {
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.9)",
    } : {}),
  };

  return (
    <>
      {!showHome && <PreloadPage onContinue={() => setShowHome( true )} />}
      {showHome && (
        <main className="flex flex-col items-center h-screen overflow-hidden bg-[#a842b1] text-[#fddbff]">
          <LavenderFog />
          <div className={`${ isExpanded ? "hidden" : "md:grid" } grid-cols-2 items-center justify-center w-full h-full p-6 transition-all duration-2000`}>
            {/* Letras y botón */}
            <div className="text-center md:text-left md:pl-12">
              <h1 className="text-4xl font-bold pb-4">Bienvenido a mi "Mundo"</h1>
              <p className="mt-4 text-lg">
                Soy un desarrollador web FullStack con pasión por crear sitios web hermosos y funcionales aunando diseño, tecnología, creatividad y por qué no... ¡Magia!</p>
              <p className="mt-4 text-lg">Apasionado por la innovación, la mejora continua y el aprendizaje, por el diseño y el modelado, por la experiencia del usuario y la accesibilidad. También me apasionan desde muy joven la literatura y el cine de fantasía y la ciencia ficción, al igual que los juegos de rol y las aventuras gráficas. Pero de lo que realmente soy un apasionado es de pasar tiempo de calidad con mi hermosa familia.</p>
              <p className="mt-4 text-lg">Espero que disfruten de esta experiencia tanto como a mí me ha encantado hacerla.</p>
            </div>
            {/* Video*/}
            <div className="relative w-full max-w-2xl mx-auto opacity-80 brightness-50 rounded-lg overflow-hidden">
              <div
                style={{
                  WebkitMaskImage: 'radial-gradient(ellipse, black 55%, transparent 70%)',
                  maskImage: 'radial-gradient(ellipse, black 55%, transparent 70%)'
                }}
              >
                <video
                  ref={videoRef}
                  onClick={handleVideoClick}
                  className="w-full cursor-pointer"
                  playsInline
                >
                  <source src={VideoSource} type="video/mp4" />
                  Tu navegador no soporta el elemento video.
                </video>
              </div>
            </div>
          </div>
          {/* Video expandido */}
          {isExpanded && videoRect && (
            <div 
              style={videoWrapperStyle}
              className="video-expand-wrapper flex items-center justify-center"
            >
              <div
                style={{
                  WebkitMaskImage: 'radial-gradient(ellipse, black 55%, transparent 70%)',
                  maskImage: 'radial-gradient(ellipse, black 55%, transparent 70%)'
                }}
              >
              <video
                ref={expandedVideoRef}
                onClick={() => {
                  if (expandedVideoRef.current) {
                    expandedVideoRef.current.pause();
                  }
                  setIsExpanded(false);
                  setTimeout(() => setVideoRect(null), 3100);
                }}
                className="cursor-pointer"
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Cambiado a cover para llenar completamente
                  objectPosition: "center", // Ajusta esto según donde esté la zona negra
                  transform: expandAnimation ? "scale(10) translateX(15%)" : "scale(1)", // Escalado mayor
                  transformOrigin: "center center", // Punto de origen del escalado
                  transition: "all 8s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <source src={VideoSource} type="video/mp4" />
                Tu navegador no soporta el elemento video.
              </video>
              <div
                style={{
                  WebkitMaskImage: 'radial-gradient(ellipse, black 55%, transparent 70%)',
                  maskImage: 'radial-gradient(ellipse, black 55%, transparent 70%)'
                }}
              >
              <video
                ref={expandedVideoRef}
                onClick={() => {
                  if (expandedVideoRef.current) {
                    expandedVideoRef.current.pause();
                  }
                  setIsExpanded(false);
                  setTimeout(() => setVideoRect(null), 3100);
                }}
                className="cursor-pointer"
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Cambiado a cover para llenar completamente
                  objectPosition: "center", // Ajusta esto según donde esté la zona negra
                  transform: expandAnimation ? "scale(10) translateX(15%)" : "scale(1)", // Escalado mayor
                  transformOrigin: "center center", // Punto de origen del escalado
                  transition: "all 8s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <source src={VideoSource} type="video/mp4" />
                Tu navegador no soporta el elemento video.
              </video>
              </div>
            </div>
            </div>
          )}
        </main>
      )}
    </>
  );
}