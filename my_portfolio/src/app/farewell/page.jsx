"use client";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Ancient from "@/components/Ancient";

export default function Page () {
  const [ videoSpeed, setVideoSpeed ] = useState( 0.5 );
  const [ videoLoaded, setVideoLoaded ] = useState( false );
  const [ isEnded, setIsEnded ] = useState( true ); // Cambiar de false a true
  const [ fadeIn, setFadeIn ] = useState( true );   // Cambiar de false a true
  const [ currentPage, setCurrentPage ] = useState( 0 );
  const [ transitionActive, setTransitionActive ] = useState( false );
  const [ skipHintVisible, setSkipHintVisible ] = useState( false );

  const videoRef = useRef( null );

  // Función para terminar el video al hacer clic
  const handleSkipVideo = () => {
    const video = videoRef.current;
    if ( video && !isEnded )
    {
      // Pausar el video y marcarlo como terminado
      video.pause();
      setIsEnded( true );
      // Iniciar la animación de entrada
      setTimeout( () => setFadeIn( true ), 200 );
    }
  };

  // Datos para los diferentes pergaminos
  const scrollContents = [
    {
      title: "Agradeciminetos",
      content: "<p>Quiero expresar mi más sincero agradecimiento a todas las personas que me han apoyado en este viaje.</p>" +
        "<p>Gracias a mi familia por su amor incondicional y su paciencia. Por sacrificar su tiempo y recursos para ayudarme a alcanzar mis metas.</p>" +
        "<p>A mis amigos, por estar siempre ahí y por sus palabras de aliento.</p>" +
        "<p>Y a todos los mentores y profesores que compartieron su conocimiento y experiencia conmigo.</p>" +
        "<p>De corazón, gracias a todos por ser parte de mi historia y por ayudarme a convertir mis sueños en realidad.</p>" +
        "<p>¡Espero que disfruten de mi trabajo!</p>",
    },
  ];

  // Función para cambiar de página
  const changePage = ( direction ) => {
    setTransitionActive( true );

    setTimeout( () => {
      if ( direction === 'next' )
      {
        setCurrentPage( prev => ( prev + 1 ) % scrollContents.length );
      } else
      {
        setCurrentPage( prev => ( prev - 1 + scrollContents.length ) % scrollContents.length );
      }

      setTimeout( () => {
        setTransitionActive( false );
      }, 50 );
    }, 500 );
  };

  // Función para cambiar a una página específica
  const goToPage = ( pageIndex ) => {
    if ( currentPage === pageIndex ) return;

    setTransitionActive( true );

    setTimeout( () => {
      setCurrentPage( pageIndex );

      setTimeout( () => {
        setTransitionActive( false );
      }, 50 );
    }, 500 );
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
        setTimeout( () => setFadeIn( true ), 200 );
      } );

      // Mostrar mensaje de "Clic para saltar" después de 2 segundos
      const skipHintTimer = setTimeout( () => {
        setSkipHintVisible( true );
      }, 2000 );

      return () => {
        clearTimeout( skipHintTimer );
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

  return (
    <div className="relative w-screen h-screen bg-gradient-to-b from-[#5f1064] to-fuchsia-500 overflow-hidden">
      <div
      className="absolute top-64 inset-0 z-0 bg-fill bg-center bg-no-repeat bg-[url('/assets/LOGO.svg')]"
      />

        <div className="relative ">
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
                  title={scrollContents[ currentPage ].title}
                  content={scrollContents[ currentPage ].content}
                  currentPage={currentPage}
                  scrollContents={scrollContents}
                  onChangePage={changePage}
                  onGoToPage={goToPage}
                  transitionActive={transitionActive}
                />
              </div>
            </div>
          )}
        </div>
      </div>
  );
}