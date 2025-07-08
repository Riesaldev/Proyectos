"use client";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Lake from "../../../public/videos/Lake.webm";
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
      title: "El Lago de La Dama",
      content: "<p>Varios dias de busqueda en el plano onírico han llevado al Mago y su asistente a encontrar un lago de aguas cristalinas, rodeado de montañas y donde la Dama del Lago les espera.</p>"+"<p>El aire está impregnado de magia y misterio, y el sonido del agua fluyendo crea una melodía hipnótica y la Dama del Lago aparece ante ellos, sonriendo. Su presencia irradia calma y poder y esta conformada por la misma esencia del lago.</p>"+"<p>Con un gesto suave, la Dama del Lago les invita a acercarse, y el Mago siente que ha llegado el momento de revelar su propósito: encontrar la Espada del Destino. La Dama del Lago asiente, comprendiendo la importancia de su misión y les revela la <strong>ubicación de la espada</strong>.Son las Hadas, en su plano, quienes protegen y guardan La Espada del Destino.Estan cada vez más cerca.</p>" 
    },
    {
      title: "Portfolio",
      content: "<p>En este portfolio encontrarás una selección de mis proyectos, terminados o en proceso, originales o clones de web conocidas que he realizado como parte de mi formación y desarrollo profesional.</p>" +
        "<p>Cada proyecto refleja mi pasión por la tecnología y el diseño, y han sido creados utilizandos las últimas tecnologías web, incluyendo HTML, CSS, JavaScript, TypeScript y frameworks modernos como React, Angular, Vue o Next.</p>" +
        "<p>Tambien he incorporado algunos proyectos de modelado 3D y de diseño en Figma, que muestran mi versatilidad y creatividad en diferentes áreas del diseño digital. Todos ellos estan incluidos en mi pagina de <a href='https://github.com/Ricardoea'>GitHub</a>.</p>" +
        "<p>Espero que disfrutes explorando mi trabajo tanto como yo disfruté creándolo. Si tienes alguna pregunta o comentario, no dudes en contactarme.</p>",
    },
    {
      title: "Portfolio Web",
      content: "<p>** Clon de Netflix **</p>"+
      "<p>Este proyecto es un clon de la popular plataforma de streaming Netflix, creado como parte de mi formación en desarrollo web. Utiliza tecnologías modernas como React y Tailwind CSS para ofrecer una experiencia de usuario fluida y atractiva.</p>" +
      "<p>El clon incluye funcionalidades como login de usuario y registro, personalizacion de perfil, y una interfaz intuitiva que permite navegar por una amplia selección de películas y series.</p>" +
      "<p>Este proyecto me ha permitido profundizar en el desarrollo de aplicaciones web complejas y en la implementación de diseños responsivos y atractivos. Aun no he terminado de pulir todos los detalles, pero estoy satisfecho con el resultado hasta ahora.</p>",
      videoSrc: "/videos/NetflixClone.mp4"
    },
    {
      title: "Portfolio Web",
      content: "<p>** Blurry **</p>"+
      "<p>Este es un proyecto es una idea original que estoy desarrollado, se trata de una aplicacion de citas basada en un famoso formato televisivo donde los participantes intentan conocer a su pareja, sin verse físicamente.</p>" +
      "<p>La aplicación utiliza tecnologías modernas como React y Tailwind CSS para ofrecer una experiencia de usuario fluida y atractiva. incluirá funcionalidades como chat en tiempo real y perfiles de usuario personalizados, uso de tokens como moneda interna y herramientas modernas para facilitar la conexion entre personas.</p>" +
      "<p>Este proyecto me ha permitido explorar nuevas ideas y enfoques en el desarrollo de aplicaciones web, y estoy emocionado por seguir trabajando en él.</p>",
      videoSrc: "/videos/Blurry.mp4"
    },
    {
      title: "Portfolio Web",
      content: "<p>** Hack a Flight **</p>"+
      "<p>Proyecto fin de Bootcamp realizado en grupo con el objetivo de crear una aplicación web para la búsqueda de vuelos.</p>"+
      "<p>La aplicación utiliza tecnologías modernas como React y Tailwind CSS para ofrecer una experiencia de usuario fluida y atractiva. Incluye funcionalidades como búsqueda de vuelos, filtrado por fechas y precios, y un sistema de guardado de vuelos favoritos al igual que rating de vuelos.</p>"+
      "<p>Este proyecto me ha permitido trabajar en equipo y aplicar mis conocimientos en desarrollo web de manera práctica utilizando herramientas como Git y GitHub para la gestión del código y la colaboración y metodologías Agiles como Scrum, lo que ha mejorado significativamente mi capacidad para trabajar en proyectos colaborativos.</p>"+
      "<p>Además, he aprendido a integrar APIs externas (como la API de Amadeus) y a manejar datos en tiempo real, lo que ha sido un gran desafío y una valiosa experiencia de aprendizaje.</p>"+
      "<p>También cuento con una versión en proceso que incluye mejoras en la interfaz de usuario y nuevas funcionalidades ya a nivel personal.</p>"+
      "<p>Estoy emocionado por seguir trabajando en este proyecto y llevarlo al siguiente nivel.</p>",
      imageSrc: "/images/HaF.png",
      imageAlt: "Hack a Flight"
    },
    {
      title: "Portfolio Web",
      content: "<p>** GTA VI **</p>"+
      "<p>Este es un proyecto en el que estoy trabajando actualmente, se trata de un clon de la web oficial de GTA VI.</p>"+
      "<p>El objetivo es recrear la estética y funcionalidad de la web oficial, utilizando tecnologías modernas como React y Tailwind CSS para ofrecer una experiencia de usuario fluida y atractiva.</p>" +
      "<p>El clon es uno de los tutoriales de Midudev, un reconocido youtuber español especializado en desarrollo web, y me ha permitido aprender mucho sobre la creación de interfaces de usuario atractivas y funcionales.</p>" +
      "<p>Este proyecto me ha permitido profundizar en el desarrollo de aplicaciones web complejas y en la implementación de diseños responsivos y atractivos. Aun no he terminado de pulir todos los detalles, pero estoy satisfecho con el resultado hasta ahora.</p>",
      imageSrc: "/images/gta.png",
      imageAlt: "GTA VI"
    },
    {
      title: "Portfolio Web",
      content: "<p>** Conference Ticket Generator **</p>"+
      "<p>Una aplicación web que permite a los usuarios generar entradas para conferencias de manera fácil y rápida. Se basa en un formulario simple donde los usuarios ingresan sus datos y reciben una entrada.</p>"+
      "<p>Este en uno de los proyectos realizados a travez de la plataforma Frontend Mentor y solo incluye, por el momento, la parte visual.</p>"+
      "<p>Tengo la intención de agregar más funcionalidades en el futuro, como la integración con pasarelas de pago y la generación de entradas en formato PDF y hacer de lo que era un desafio de frontend un proyecto completo.</p>"+
      "<p>Este proyecto me ha permitido mejorar mis habilidades en el desarrollo de formularios y la validación de datos, así como en la creación de interfaces de usuario atractivas y funcionales. Motivado con la idea de llevarlo al siguiente nivel.</p>",
      imageSrc: "/images/Ticket.png",
      imageAlt: "Conference Ticket Generator"
    },
    {
      title: "Portfolio design",
      content: "<p>** ICHIBAN **</p>"+
      "<p>Este es un proyecto de diseño el cual, a travez de de multiples imagenes, generamos una experiencia visual del movimiento de una moto.</p>"+
      "<p>El objetivo es crear un video controlado por scroll, donde cada imagen se muestra en un momento específico del desplazamiento del usuario, creando una sensación de movimiento fluido y dinámico.</p>" +
      "<p>El proyecto pertenece a los tutoriales de Midudev, un reconocido youtuber español especializado en desarrollo web, y me ha permitido aprender mucho sobre la creación de experiencias visuales y dinámicas en la web.</p>" +
      "<p>Me parece un proyecto muy interesante y divertido a la par que atractivo</p>",
      videoSrc: "/videos/ichiban.mp4"
    },
    {
      title: "Portfolio design",
      content: "<p>** Lion King **</p>"+
      "<p>Pequeño proyecto de diseño en Figma, inspirado en el clásico de Disney, El Rey León.</p>"+
      "<p>El objetivo es crear una interfaz de usuario atractiva y funcional, utilizando colores y elementos visuales que evocan la esencia de la película.</p>" +
      "<p>Este proyecto me ha permitido mejorar mis habilidades en el diseño de interfaces y la creación de experiencias visuales atractivas. Aunque es un proyecto más pequeño en comparación con otros, ha sido una excelente oportunidad para experimentar con el diseño y la creatividad dentro de Figma.</p>" +
      "<p>Me parece un proyecto muy interesante y divertido a la par que atractivo, tambien tengo algunos ejemplo mas en Figma como algun formulario de registro y login, o un diseño de Parallax.</p>",
      videoSrc: "/videos/figma2.mp4"
    },
    {
      title: "Portfolio design",
      content: "<p>** Motion FX **</p>"+
      "<p>Este proyecto hace referencia a un addon de Blender que permite crear efectos de movimiento y animaciones de manera sencilla y rápida.</p>"+
      "<p>El objetivo es practicar con Python y Blender, creando un addon aunque aun no he conseguido que funcione correctamente, pero es un proyecto en el que estoy trabajando y aprendiendo mucho sobre la creación de addons y la programación en Python.</p>" +
      "<p>Este proyecto me ha permitido mejorar mis habilidades en la programación y la creación de addons para Blender, así como en la creación de efectos visuales y animaciones. Aunque es un proyecto más técnico, ha sido una excelente oportunidad para experimentar con la programación y la creatividad dentro de Blender.</p>" +
      "<p>Me parece un proyecto muy interesante y divertido a la par que atractivo, y estoy emocionado por seguir trabajando en él y llevarlo a cotas más altas.</p>",
      imageSrc: "/images/Addon.png",
      imageAlt: "Motion FX"
    },
    {
      title: "Portfolio design",
      content: "<p>** 3D Model **</p>"+
      "<p>Con respecto a mis proyectos de modelado 3D, he trabajado en una variedad de modelos utilizando herramientas como Blender, ZBrush y 3ds Max.</p>"+
      "<p>Estos proyectos incluyen desde modelos de personajes y criaturas hasta entornos y objetos, cada uno con su propio estilo y técnica de modelado. Una prueba de ello son los propios renders utilizados en este portfolio web.</p>"+
      "<p>El modelado 3D es una de mis pasiones y me encanta explorar nuevas técnicas y estilos para crear modelos, animaciones únicas y detalladas. Aunque no tengo un portfolio web específico para mis proyectos de modelado 3D, estoy trabajando en crear uno que muestre mi trabajo y habilidades en esta área.</p>",
      imageSrc: "/images/Blender.png",
      imageAlt: "3D Model"
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
          <source src={Lake} type="video/webm" />
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
                videoSrc={scrollContents[currentPage].videoSrc}
                imageSrc={scrollContents[currentPage].imageSrc}
                imageAlt={scrollContents[currentPage].imageAlt}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}