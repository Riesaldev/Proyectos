"use client";
import { useState, useRef } from "react";
import PreloadPage from "./precarga/PreloadPage";
import LavenderFog from "../components/Three/LavenderFog";
import VideoSource from "../../public/assets/videos/puerta.mp4";

export default function Home () {
  const [ showHome, setShowHome ] = useState( false );
  const videoRef = useRef(null); // Definimos el videoRef

  const handleVideoClick = () => {
    // Usamos la referencia al elemento video DOM
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <>
      {!showHome && <PreloadPage onContinue={() => setShowHome( true )} />}
      {showHome && (
        <main
          className="flex flex-col items-center h-screen overflow-hidden bg-[#a842b1] text-[#fddbff]"
        >
          <LavenderFog />
          <div className="md:grid grid-cols-2 items-center justify-center w-full h-full p-6">
            {/* Letras y botón */}
            <div className="text-center md:text-left md:pl-12">
              <h1 className="text-4xl font-bold pb-4">Bienvenido a mi "Mundo"</h1>
              <p className="mt-4 text-lg">
                Soy un desarrollador web con pasión por crear sitios web hermosos y funcionales aunando diseño, tecnología, creatividad y por qué no... ¡Magia! Espero que disfruten de esta experiencia tanto como a mí me ha encantado hacerla.
              </p>
            </div>
            {/* Video*/}
            <div className="relative w-full max-w-2xl mx-auto opacity-80 brightness-50 rounded-lg overflow-hidden">
              {/* Video con máscara aplicada para crear el efecto de desvanecimiento en los bordes */}
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
        </main>
      )}
    </>
  );
}
