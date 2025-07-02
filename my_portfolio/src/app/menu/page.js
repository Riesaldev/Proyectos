"use client";
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Main from '../../../public/assets/videos/Portals.webm';
import DPortal from '../../../public/assets/videos/DPortal.webm';
import IPortal from '../../../public/assets/videos/IPortal.webm';


export default function Menu() {
  const videoRef = useRef(null);
  const secondVideoRef = useRef(null);
  const [currentPortal, setCurrentPortal] = useState("main");
  const [videoSource, setVideoSource] = useState(Main);
  const [mainVideoPlayed, setMainVideoPlayed] = useState(false);
  const [isRewinding, setIsRewinding] = useState(false);
  const rewindIntervalRef = useRef(null);
  const [activeVideoRef, setActiveVideoRef] = useState('primary');
  const [videoTransitionComplete, setVideoTransitionComplete] = useState(false); // Cambiado a false inicialmente
  // Añadir un nuevo estado para controlar la carga previa de videos
  const [videosPreloaded, setVideosPreloaded] = useState({
    main: false,
    dportal: false,
    iportal: false
  });

  // Configuración inicial de los videos
  useEffect(() => {
    // Verificar si los videos ya están en caché
    const mainCached = sessionStorage.getItem('video_main_cached') === 'true';
    const dportalCached = sessionStorage.getItem('video_dportal_cached') === 'true';
    const iportalCached = sessionStorage.getItem('video_iportal_cached') === 'true';
    
    console.log("Estado de caché de videos:", { 
      main: mainCached, 
      dportal: dportalCached, 
      iportal: iportalCached 
    });

    // Función para precargar un video
    const preloadVideo = (src, key) => {
      const tempVideo = document.createElement('video');
      tempVideo.preload = 'auto';
      tempVideo.src = src;
      tempVideo.muted = true;
      tempVideo.style.display = 'none';
      
      tempVideo.oncanplaythrough = () => {
        console.log(`Video ${key} precargado`);
        setVideosPreloaded(prev => ({...prev, [key]: true}));
        sessionStorage.setItem(`video_${key}_cached`, 'true');
        document.body.removeChild(tempVideo);
      };
      
      document.body.appendChild(tempVideo);
    };

    // Precargar videos si no están en caché
    if (!mainCached) preloadVideo(Main, 'main');
    if (!dportalCached) preloadVideo(DPortal, 'dportal');
    if (!iportalCached) preloadVideo(IPortal, 'iportal');
    
    if (videoRef.current && secondVideoRef.current) {
      videoRef.current.playbackRate = 0.30;
      secondVideoRef.current.playbackRate = 0.30;

      // Configuración para mejorar el uso de caché
      videoRef.current.preload = 'auto';
      secondVideoRef.current.preload = 'auto';
      
      // Aseguramos que ambos videos estén muteados
      videoRef.current.muted = true;
      secondVideoRef.current.muted = true;
      
      if (currentPortal === "main" && mainVideoPlayed && videoSource === Main && 
          !isNaN(videoRef.current.duration) && isFinite(videoRef.current.duration)) {
        videoRef.current.currentTime = videoRef.current.duration - 0.1;
      }
    }

    return () => {
      if (rewindIntervalRef.current) {
        clearInterval(rewindIntervalRef.current);
      }
    };
  }, [currentPortal, mainVideoPlayed, videoSource]);

  const handleVideoEnded = () => {
    if (videoSource === Main) {
      setMainVideoPlayed(true);
      setVideoTransitionComplete(true); // Mostrar contenido cuando el video principal termine
    }
  };

  const playVideoInReverse = (originalSource) => {
    setIsRewinding(true);
    // Ocultamos el contenido durante el rebobinado
    setVideoTransitionComplete(false);
    
    const currentVideoRef = activeVideoRef === 'primary' ? videoRef.current : secondVideoRef.current;
    
    if (currentVideoRef && !isNaN(currentVideoRef.duration) && isFinite(currentVideoRef.duration)) {
      const videoDuration = currentVideoRef.duration;
      currentVideoRef.currentTime = videoDuration;
      
      const rewindStep = 0.01; // Ajustado para una velocidad de rewind más fluida
      rewindIntervalRef.current = setInterval(() => {
        if (currentVideoRef.currentTime <= rewindStep) {
          clearInterval(rewindIntervalRef.current);
          
          // Preparamos el otro video para la transición
          const nextVideoRef = activeVideoRef === 'primary' ? secondVideoRef.current : videoRef.current;
          nextVideoRef.src = Main;
          
          // Esperar a que los metadatos del video estén cargados antes de establecer currentTime
          nextVideoRef.addEventListener('loadedmetadata', function onMetadataLoaded() {
            if (!isNaN(nextVideoRef.duration) && isFinite(nextVideoRef.duration)) {
              nextVideoRef.currentTime = nextVideoRef.duration - 0.1;
            }
            // Eliminar el listener después de usarlo para evitar duplicados
            nextVideoRef.removeEventListener('loadedmetadata', onMetadataLoaded);
          }, { once: true });
          
          // Configuramos la transición suave
          nextVideoRef.style.opacity = '0';
          nextVideoRef.style.transition = 'opacity 0.3s';
          
          // Iniciamos la transición
          setTimeout(() => {
            nextVideoRef.style.opacity = '1';
            currentVideoRef.style.opacity = '0';
            
            // Cambiamos la referencia activa
            setActiveVideoRef(activeVideoRef === 'primary' ? 'secondary' : 'primary');
            setVideoSource(Main);
            setCurrentPortal("main");
            setMainVideoPlayed(true);
            setIsRewinding(false);
            
            // Mostramos el contenido después de completar el rebobinado
            setVideoTransitionComplete(true);
          }, 50);
          
        } else {
          currentVideoRef.currentTime -= rewindStep;
        }
      }, 33);
    } else {
      setVideoSource(Main);
      setCurrentPortal("main");
      setMainVideoPlayed(true);
      setIsRewinding(false);
    }
  };

  // Función mejorada para cambiar entre portales
  const playPortalVideo = (portal) => {
    if (isRewinding) return;
    
    // Ocultamos el contenido durante la transición
    setVideoTransitionComplete(false);
    
    if (portal === "main" && (currentPortal === "Right" || currentPortal === "Left")) {
      const currentVideo = currentPortal === "Right" ? DPortal : IPortal;
      playVideoInReverse(currentVideo);
      return;
    }
    
    let source;
    switch (portal) {
      case "right": source = DPortal; break;
      case "left": source = IPortal; break;
      default: source = Main;
    }
    
    // Preparamos el video inactivo para la transición
    const currentVideoRef = activeVideoRef === 'primary' ? videoRef.current : secondVideoRef.current;
    const nextVideoRef = activeVideoRef === 'primary' ? secondVideoRef.current : videoRef.current;
    
    // Aseguramos que el nuevo video esté completamente cargado antes de iniciar la transición
    nextVideoRef.src = source;
    nextVideoRef.style.opacity = '0';
    
    // Función para iniciar la transición cuando el video esté listo
    const startTransition = () => {
      // Iniciamos la transición suave
      nextVideoRef.style.transition = 'opacity 0.5s ease-in-out'; // Aumentado a 0.5s para suavizar
      currentVideoRef.style.transition = 'opacity 0.5s ease-in-out';
      
      nextVideoRef.style.opacity = '1';
      // Mantenemos el video actual visible un poco más
      setTimeout(() => {
        currentVideoRef.style.opacity = '0';
      }, 100);
      
      // Cambiamos la referencia activa
      setActiveVideoRef(activeVideoRef === 'primary' ? 'secondary' : 'primary');
      setVideoSource(source);
      
      // Actualizamos el estado después de completar la animación
      setTimeout(() => {
        if (portal === "right") {
          setCurrentPortal("Right");
        } else if (portal === "left") {
          setCurrentPortal("Left");
        } else {
          setCurrentPortal("main");
        }
        
        // Mostramos el contenido después de la transición
        setVideoTransitionComplete(true);
      }, 1000);
    };
    
    // Aseguramos que el video esté cargado antes de reproducirlo
    nextVideoRef.oncanplay = () => {
      nextVideoRef.oncanplay = null; // Evitar múltiples activaciones
      nextVideoRef.play().then(startTransition);
    };
    
    // Si el video ya está en buffer, podemos reproducirlo inmediatamente
    if (nextVideoRef.readyState >= 3) {
      nextVideoRef.oncanplay = null;
      nextVideoRef.play().then(startTransition);
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
                onClick={() => playPortalVideo("left")}
              />
              <div className="Portal flex flex-col items-center justify-center">
                <p className="text-[#812286] text-xl font-black text-center justify-around items-center relative bottom-6">Portal Central <br/><span>(Inicio)</span></p>
                {/* Zona clicable del portal central */}
                <Link href="/">
                  <div className="w-40 h-40 border-4 border-[#812286] rounded-full bg-black bg-opacity-20 hover:bg-opacity-40 cursor-pointer transition-all duration-300 flex items-center justify-center">
                    <span className="text-[#fddbff] text-lg font-bold">Inicio</span>
                  </div>
                </Link>
              </div>
              <img 
                src="/assets/images/arrow1.png" 
                alt="Flecha Derecha" 
                className="w-24 h-24 top-40 relative cursor-pointer" 
                onClick={() => playPortalVideo("right")}
              />
            </div>
          </>
        );
      
      case "Right":
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
                {/* Zona clicable del portal de proyectos */}
                <Link href="/projects">
                  <div className="w-40 h-40 border-4 border-[#812286] rounded-full bg-black bg-opacity-20 hover:bg-opacity-40 cursor-pointer transition-all duration-300 flex items-center justify-center">
                    <span className="text-[#fddbff] text-lg font-bold">Proyectos</span>
                  </div>
                </Link>
              </div>
            </div>
          </>
        );
      
      case "Left":
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
                {/* Zona clicable del portal de conocimiento */}
                <Link href="/skills">
                  <div className="w-40 h-40 border-4 border-[#812286] rounded-full bg-black bg-opacity-20 hover:bg-opacity-40 cursor-pointer transition-all duration-300 flex items-center justify-center">
                    <span className="text-[#fddbff] text-lg font-bold">Habilidades</span>
                  </div>
                </Link>
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
    <div className="flex flex-col items-center justify-center h-4/5 bg-black">
      <div className="flex flex-col items-center justify-center z-0 inset-0 absolute bg-black">
        {/* Video principal */}
        <video 
          ref={videoRef} 
          autoPlay={!mainVideoPlayed || videoSource !== Main}
          muted 
          className='w-full h-full object-cover'
          src={videoSource}
          onEnded={handleVideoEnded}
          onLoadedMetadata={() => {
            if (videoSource === Main && mainVideoPlayed && 
                videoRef.current && !isNaN(videoRef.current.duration) && isFinite(videoRef.current.duration)) {
              videoRef.current.currentTime = videoRef.current.duration - 0.1;
            }
          }}
          style={{
            opacity: activeVideoRef === 'primary' ? '1' : '0',
            transition: 'opacity 0.5s ease-in-out',
            backgroundColor: 'black'
          }}
        />
        
        {/* Video secundario para transiciones suaves */}
        <video 
          ref={secondVideoRef} 
          autoPlay
          muted 
          className='w-full h-full object-cover absolute top-0 left-0'
          style={{
            opacity: activeVideoRef === 'secondary' ? '1' : '0',
            transition: 'opacity 0.5s ease-in-out',
            backgroundColor: 'black'
          }}
        />
      </div>
      {videoTransitionComplete && renderPortalContent()}
    </div>
  );
}
