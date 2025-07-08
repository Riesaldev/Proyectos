"use client";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Sword from "../../../public/videos/Sword.webm";
import Ancient from "@/components/Ancient";
import ContactForm from "@/components/ContactForm";

export default function Page () {
  const [ videoSpeed, setVideoSpeed ] = useState( 0.75 );
  const [ videoLoaded, setVideoLoaded ] = useState( false );
  const [ isEnded, setIsEnded ] = useState( false );
  const [ fadeIn, setFadeIn ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ transitionActive, setTransitionActive ] = useState(false);
  const [ skipHintVisible, setSkipHintVisible ] = useState(false);

  const videoRef = useRef( null );

  // Función para terminar el video al hacer clic
  const handleSkipVideo = () => {
    const video = videoRef.current;
    if (video && !isEnded) {
      // Pausar el video y marcarlo como terminado
      video.pause();
      setIsEnded(true);
      // Iniciar la animación de entrada
      setTimeout(() => setFadeIn(true), 200);
    }
  };

  // Datos para los diferentes pergaminos
  const scrollContents = [
    {
      title: "El Bosque de Las Hadas",
      content: "<p>El Bosque de Las Hadas es un lugar de paz y armonía, donde la naturaleza y la magia coexisten en perfecta sintonía. Aquí, las criaturas mágicas viven en perfecta armonía, cuidando de su hogar y protegiendo los secretos que guarda. Es un lugar donde los sueños se hacen realidad y las leyendas cobran vida.</p>"+
      "<p>En lo más profundo del bosque, donde la luz apenas penetra, se encuentra un lugar mágico donde las hadas danzan y juegan entre los árboles. Este es un mundo de ensueño, lleno de colores vibrantes y sonidos melodiosos. En este lugar, en el que tiempo parece detenerse y la realidad se mezcla con la fantasía existe un claro bañado por el sol donde, finalmente, nuestro héroes encuentran la Espada del Destino y con ella la clave para salvar a todos los seres del multiverso.</p>" +
      "<p>FIN.</p>",
    },
    {
      title: "Contacto",
      content: "<p>Si deseas ponerte en contacto conmigo, puedes hacerlo a través del siguiente formulario:</p>"+
      "<p class='mt-4'>¡Espero que disfrutes de mi trabajo!</p>"+
      "<p class='mt-4 text-fuchsia-600 underline'><a href='/farewell'>Agradecimientos</a></p>",
      hasCustomComponent: true,
      customComponent: "ContactForm"
    },
    
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

      // Mostrar mensaje de "Clic para saltar" después de 2 segundos
      const skipHintTimer = setTimeout(() => {
        setSkipHintVisible(true);
      }, 2000);

      return () => {
        clearTimeout(skipHintTimer);
      };
    }
    return () => {
      if ( video )
      {
        video.removeEventListener( "canplaythrough", () => { } );
        video.removeEventListener( "ended", () => { } );
      }
    };
  }, [] );

  // Modificar el componente Ancient para renderizar componentes personalizados
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="cover absolute inset-0 z-0">
        <video
          autoPlay
          muted
          className="w-full h-full object-cover"
          ref={videoRef}
        >
          <source src={Sword} type="video/webm" />
          Tu navegador no soporta el elemento video.
        </video>
        
        {/* Overlay clickeable para saltar el video */}
        {!isEnded && (
          <div 
            className="absolute inset-0 cursor-pointer flex items-center justify-center"
            onClick={handleSkipVideo}
          >
            {skipHintVisible && (
              <div className="bg-fuchsia-500/60  text-white px-4 py-2 rounded-full text-sm font-medium transition-opacity duration-500 hover:bg-opacity-70">
                Clic para saltar la intro
              </div>
            )}
          </div>
        )}
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
              <Ancient
                title={scrollContents[currentPage].title}
                content={scrollContents[currentPage].content}
                currentPage={currentPage}
                scrollContents={scrollContents}
                onChangePage={changePage}
                onGoToPage={goToPage}
                transitionActive={transitionActive}
                customComponent={scrollContents[currentPage].hasCustomComponent ? <ContactForm /> : null}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}