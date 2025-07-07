"use client";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Lab from "../../../public/videos/Lab.webm";
import Ancient from "@/components/Ancient";

export default function Page () {
  const [ videoSpeed, setVideoSpeed ] = useState( 0.5 );
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
      title: "El Laboratorio",
      content: "<p>Tras incontables días de investigación, sumergido en cada libro a su alcance, el Mago por fin ha descubierto la manera de abrir un portal al mundo de los sueños, donde habita la misteriosa Dama del Lago.</p> " +
        "<p>Con la ayuda de su fiel asistente, ha preparado todos los ingredientes necesarios para llevar a cabo el ritual.</p> " +
        "<p>El laboratorio rebosa de frascos, pociones y artefactos mágicos, cada uno con una función específica dentro de este proceso arcano.</p>" +
        "<p>En el aire se respira una mezcla de misterio y expectación mientras ambos se disponen a dar el siguiente paso en su viaje onírico, con la esperanza de encontrar la Espada del Destino y, con ella, la salvación de su mundo.</p>",
    },
    {
      title: "Sobre mi",
      content: "<p>Soy un desarrollador web apasionado por la tecnología, el diseño y la narrativa interactiva.</p>"+
      "<p>Mi vocación es crear experiencias únicas que no solo sean funcionales, sino también visualmente impactantes y emocionalmente significativas.</p>"+
      "<p>Aunque mi experiencia laboral comenzó en 2004, fue en 2018 cuando inicié un camino de formación en modelado 3D, especializándome en herramientas como Blender, ZBrush y 3ds Max.</p>"+
      "<p>Cursé estudios como Técnico Superior en Escultura, pero por giros inesperados de la vida, terminé dedicándome a la construcción como soldador y montador de estructuras metálicas. Sin embargo, esa etapa me llevó a replantear mi rumbo.</p>"+
      "<p>Decidí dar un giro de 180 grados y reenfocar mi futuro en lo que realmente me apasiona: la tecnología y la creatividad. En 2024 me formé como desarrollador web full stack a través de un bootcamp intensivo, complementando mi aprendizaje con certificaciones en frameworks de JavaScript y CSS, TypeScript, y metodologías ágiles como Scrum. Hoy fusiono toda esa experiencia para construir proyectos que cuentan historias, despiertan emociones y dan vida a ideas.</p>"+
      "<p>Aunque mi experiencia profesional en desarrollo web es reciente, mi pasión por la tecnología y el diseño es de larga data y suplo con mi dedicación y creatividad lo que me falta en años de experiencia. También aporto mi experiencia previa en el ámbito de la construcción, la hostelería (12 años en puestos de responsabilidad en cocina y eventos; desde trabajar en el World Travel Market de Londres a ser jefe de sección en hoteles de 5 estrellas gran lujo o aprender de mano de estrellas Michelin y trabajar con ellos) e incluso en el Ejercito Español, donde aprendí disciplina, trabajo en equipo y liderazgo. Todo ello me ha permitido desarrollar una mentalidad resiliente y una capacidad de adaptación que considero esenciales en el mundo del desarrollo web.</p>",
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
        
        {/* Overlay clickeable para saltar el video */}
        {!isEnded && (
          <div 
            className="absolute inset-0 cursor-pointer flex items-center justify-center"
            onClick={handleSkipVideo}
          >
            {skipHintVisible && (
              <div className="bg-fuchsia-500/60 text-white px-4 py-2 rounded-full text-sm font-medium transition-opacity duration-500 hover:bg-opacity-70">
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
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}