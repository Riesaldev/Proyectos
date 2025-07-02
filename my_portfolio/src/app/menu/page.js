"use client";
import { useRef, useEffect, useState, useCallback } from 'react';
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
  const [videoTransitionComplete, setVideoTransitionComplete] = useState(false);
  const [videosPreloaded, setVideosPreloaded] = useState({
    main: false,
    dportal: false,
    iportal: false
  });
  const [videoTimeRange, setVideoTimeRange] = useState({
    main: { start: 0, end: 1.25 }, // Por ejemplo: reproducir solo los primeros 1 segundos
    dportal: { start: 0, end: null }, // null significa hasta el final
    iportal: { start: 0, end: null }
  });
  const [videoPlaybackSpeed, setVideoPlaybackSpeed] = useState({
    main: 0.30,
    dportal: 0.40,
    iportal: 0.40
  });

  // Reemplazar el componente VideoPreloader actual con esta implementación
  const VideoPreloader = () => {
    useEffect(() => {
      const videoSources = [
        { src: Main, key: 'main' },
        { src: DPortal, key: 'dportal' },
        { src: IPortal, key: 'iportal' }
      ];
      
      videoSources.forEach(({src, key}) => {
        if (sessionStorage.getItem(`video_${key}_cached`) !== 'true') {
          const preloadVideo = new Audio(src);
          preloadVideo.preload = 'auto';
          preloadVideo.muted = true;
          preloadVideo.oncanplaythrough = () => {
            console.log(`Video ${key} precargado correctamente`);
            sessionStorage.setItem(`video_${key}_cached`, 'true');
            setVideosPreloaded(prev => ({...prev, [key]: true}));
          };
        } else {
          setVideosPreloaded(prev => ({...prev, [key]: true}));
        }
      });
    }, []);
    
    return null;
  };

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

    // Marcar videos como precargados si ya están en caché
    setVideosPreloaded({
      main: mainCached,
      dportal: dportalCached,
      iportal: iportalCached
    });
    
    // Monitorear eventos de carga completa para los videos preload
    const updateCacheStatus = (videoSrc, key) => {
      const checkVideoLoaded = () => {
        console.log(`Video ${key} precargado`);
        setVideosPreloaded(prev => ({...prev, [key]: true}));
        sessionStorage.setItem(`video_${key}_cached`, 'true');
      };
      
      // Crear una instancia temporal para verificar si el video ya está en caché
      if (!sessionStorage.getItem(`video_${key}_cached`)) {
        const tempVideo = document.createElement('video');
        tempVideo.preload = 'auto';
        tempVideo.src = videoSrc;
        tempVideo.muted = true;
        tempVideo.style.display = 'none';
        tempVideo.oncanplaythrough = () => {
          checkVideoLoaded();
          document.body.removeChild(tempVideo);
        };
        document.body.appendChild(tempVideo);
      }
    };

    // Verificar el estado de precarga de los videos
    if (!mainCached) updateCacheStatus(Main, 'main');
    if (!dportalCached) updateCacheStatus(DPortal, 'dportal');
    if (!iportalCached) updateCacheStatus(IPortal, 'iportal');
    
    // Configuración inicial de los videos
    if (videoRef.current && secondVideoRef.current) {
      // Establecer la velocidad de reproducción según el tipo de video actual
      const videoKey = videoSource === Main ? 'main' : 
                       videoSource === DPortal ? 'dportal' : 
                       videoSource === IPortal ? 'iportal' : 'main';
      
      videoRef.current.playbackRate = videoPlaybackSpeed[videoKey];
      secondVideoRef.current.playbackRate = videoPlaybackSpeed[videoKey];

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
  }, [currentPortal, mainVideoPlayed, videoSource, videoPlaybackSpeed]);

  const handleVideoEnded = useCallback(() => {
    if (videoSource === Main) {
      setMainVideoPlayed(true);
      if (videoRef.current) {
        // Posicionar al final del rango especificado
        videoRef.current.currentTime = videoTimeRange.main.end - 0.01;
      }
      setVideoTransitionComplete(true);
    }
  }, [videoSource, videoTimeRange]);

  const playVideoInReverse = () => {
    setIsRewinding(true);
    setVideoTransitionComplete(false);
    
    const currentVideoRef = activeVideoRef === 'primary' ? videoRef.current : secondVideoRef.current;
    
    if (currentVideoRef && !isNaN(currentVideoRef.duration) && isFinite(currentVideoRef.duration)) {
      currentVideoRef.currentTime = currentVideoRef.duration;
      
      // Usar requestAnimationFrame para un rebobinado más suave
      let lastTimestamp = null;
      const rewindStep = 0.01;
      
      const rewindFrame = (timestamp) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const elapsed = timestamp - lastTimestamp;
        
        if (elapsed > 16) { // ~60fps
          if (currentVideoRef.currentTime <= rewindStep) {
            // Finalizar rebobinado
            setCurrentPortal("main");
            setMainVideoPlayed(true);
            setIsRewinding(false);
            setTimeout(() => setVideoTransitionComplete(true), 50);
          } else {
            // Continuar rebobinado
            currentVideoRef.currentTime -= rewindStep;
            lastTimestamp = timestamp;
            requestAnimationFrame(rewindFrame);
          }
        } else {
          requestAnimationFrame(rewindFrame);
        }
      };
      
      requestAnimationFrame(rewindFrame);
    } else {
      // Fallback
      setCurrentPortal("main");
      setMainVideoPlayed(true);
      setIsRewinding(false);
      setVideoTransitionComplete(true);
    }
  };

  // Función mejorada para cambiar entre portales
  const playPortalVideo = (portal) => {
    if (isRewinding) return;
    
    setVideoTransitionComplete(false);
    
    if (portal === "main" && (currentPortal === "Right" || currentPortal === "Left")) {
      playVideoInReverse();
      return;
    }
    
    const portalMap = {
      "right": { source: DPortal, newPortal: "Right", key: "dportal" },
      "left": { source: IPortal, newPortal: "Left", key: "iportal" },
      "main": { source: Main, newPortal: "main", key: "main" }
    };
    
    const { source, newPortal, key } = portalMap[portal] || portalMap["main"];
    
    // Alternar entre videos para transición suave
    const nextVideoRef = activeVideoRef === 'primary' ? secondVideoRef.current : videoRef.current;
    const currentVideoRef = activeVideoRef === 'primary' ? videoRef.current : secondVideoRef.current;
    
    // Preparar y reproducir el nuevo video
    nextVideoRef.src = source;
    nextVideoRef.currentTime = videoTimeRange[key].start;
    
    // Iniciar reproducción cuando el video esté listo
    const handleCanPlay = () => {
      nextVideoRef.removeEventListener('canplay', handleCanPlay);
      
      // Establecer la velocidad de reproducción antes de iniciar el video
      nextVideoRef.playbackRate = videoPlaybackSpeed[key];
      
      nextVideoRef.play().then(() => {
        // Animación de transición
        nextVideoRef.style.opacity = '1';
        setTimeout(() => currentVideoRef.style.opacity = '0', 100);
        
        // Actualizar estados
        setActiveVideoRef(activeVideoRef === 'primary' ? 'secondary' : 'primary');
        setVideoSource(source);
        
        // Mostrar contenido después de la transición
        setTimeout(() => {
          setCurrentPortal(newPortal);
          setVideoTransitionComplete(true);
        }, 2400);
      });
    };
    
    if (nextVideoRef.readyState >= 3) {
      handleCanPlay();
    } else {
      nextVideoRef.addEventListener('canplay', handleCanPlay);
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
    <>
      {/* Componente de precarga que se renderiza al principio */}
      <VideoPreloader />
      
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
              if (videoRef.current && !isNaN(videoRef.current.duration) && isFinite(videoRef.current.duration)) {
                // Establecer el tiempo inicial según el video actual
                const videoKey = videoSource === Main ? 'main' : 
                                 videoSource === DPortal ? 'dportal' : 
                                 videoSource === IPortal ? 'iportal' : 'main';
                const startTime = videoTimeRange[videoKey].start;
                
                // Si es el video principal y ya se reprodujo, posicionarlo en el punto final menos 0.1s
                if (videoSource === Main && mainVideoPlayed) {
                  videoRef.current.currentTime = videoTimeRange.main.end - 0.1;
                } else {
                  videoRef.current.currentTime = startTime;
                }
              }
            }}
            onTimeUpdate={() => {
              // Controlar el final del video según el rango especificado
              if (videoRef.current) {
                const videoKey = videoSource === Main ? 'main' : 
                                videoSource === DPortal ? 'dportal' : 
                                videoSource === IPortal ? 'iportal' : 'main';
                const endTime = videoTimeRange[videoKey].end;
                
                // Si se estableció un tiempo final y ya se alcanzó
                if (endTime !== null && videoRef.current.currentTime >= endTime) {
                  videoRef.current.pause();
                  handleVideoEnded();
                }
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
            onTimeUpdate={() => {
              if (secondVideoRef.current) {
                const videoKey = videoSource === Main ? 'main' : 
                                videoSource === DPortal ? 'dportal' : 
                                videoSource === IPortal ? 'iportal' : 'main';
                const endTime = videoTimeRange[videoKey].end;
                
                if (endTime !== null && secondVideoRef.current.currentTime >= endTime) {
                  secondVideoRef.current.pause();
                  if (activeVideoRef === 'secondary') {
                    handleVideoEnded();
                  }
                }
              }
            }}
            style={{
              opacity: activeVideoRef === 'secondary' ? '1' : '0',
              transition: 'opacity 0.5s ease-in-out',
              backgroundColor: 'black'
            }}
          />
        </div>
        {videoTransitionComplete && renderPortalContent()}
      </div>
    </>
  );
}
