"use client";
import { useState, useEffect } from "react";
import './preload.css';
import Main from '../../../public/assets/videos/Portals.webm';
import DPortal from '../../../public/assets/videos/DPortal.webm';
import IPortal from '../../../public/assets/videos/IPortal.webm';
import PuertaVideo from '../../../public/assets/videos/puerta.mp4';

export default function PreloadPage({ onContinue }) {
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState({
    main: false,
    dportal: false,
    iportal: false,
    puerta: false,
  });
  // Nuevo estado para seguir el progreso de carga de cada video
  const [videoLoadProgress, setVideoLoadProgress] = useState({
    main: 0,
    dportal: 0,
    iportal: 0,
    puerta: 0,
  });

  const magicPhrases = [
    "Conjurando el código...",
    "Elaborando pociones de UI...",
    "Invocando las animaciones...",
    "Domesticando bugs...",
    "Implorando a los Dioses Antiguos..."
  ];

  // Función para precargar videos
  const preloadVideos = () => {
    const videos = [
      { url: Main, key: 'main' },
      { url: DPortal, key: 'dportal' },
      { url: IPortal, key: 'iportal' },
      { url: PuertaVideo, key: 'puerta' },
    ];

    videos.forEach(({ url, key }) => {
      const video = document.createElement('video');
      
      // Añadir un listener para el progreso de carga
      video.addEventListener('progress', () => {
        if (video.buffered.length > 0) {
          try {
            // Calcula cuánto se ha cargado del video
            const loadedPercentage = (video.buffered.end(0) / video.duration) * 100;
            console.log(`${key} video loaded: ${loadedPercentage.toFixed(2)}%`);
            
            // Actualizar el progreso de este video específico
            setVideoLoadProgress(prev => ({
              ...prev,
              [key]: loadedPercentage
            }));
          } catch (error) {
            console.error(`Error calculando progreso para ${key}:`, error);
          }
        }
      });
      
      // Añadir listener para cuando el video esté completamente cargado
      video.addEventListener('canplaythrough', () => {
        console.log(`${key} video fully loaded`);
        setVideosLoaded(prev => ({
          ...prev,
          [key]: true
        }));
        
        // Marcar este video como 100% cargado
        setVideoLoadProgress(prev => ({
          ...prev,
          [key]: 100
        }));
      });
      
      // Agregar un manejador para los errores de carga
      video.addEventListener('error', (error) => {
        console.error(`Error cargando ${key} video:`, error);
      });
      
      // Configura la fuente del video y comienza la carga
      video.preload = "auto";
      video.src = url;
      video.load(); // Esto es crucial para iniciar la carga
    });
  };

  // Función para actualizar el progreso general
  useEffect(() => {
    const updateProgress = () => {
      const totalVideos = 4; // Número total de videos a cargar
      const loadedVideos = Object.values(videosLoaded).filter(loaded => loaded).length;
      
      // Calcular el progreso basado tanto en videos completos como en progreso parcial
      const videoProgressValues = Object.values(videoLoadProgress);
      const videoProgressAverage = videoProgressValues.reduce((acc, val) => acc + val, 0) / totalVideos;
      
      // El progreso se divide en dos partes:
      // 1. Progreso del dragón (30%)
      const dragonProgress = animationLoaded ? 30 : 0;
      // 2. Progreso de los videos (70%)
      const videosProgress = videoProgressAverage * 0.7; // 70% del progreso total

      // Progreso total
      const totalProgress = Math.min(dragonProgress + videosProgress, 99); // Limitamos a 99% hasta que todo esté listo
      
      // Solo mostramos 100% cuando todo esté realmente cargado
      const finalProgress = (animationLoaded && loadedVideos === totalVideos) ? 100 : totalProgress;
      
      setProgress(finalProgress);
      
      // Actualizar la frase basada en el tiempo
      const phraseIndex = Math.floor(Date.now() / 800) % magicPhrases.length; // 5 frases, cada una cada 800ms
      if (phraseIndex !== currentPhrase && phraseIndex < magicPhrases.length) {
        setCurrentPhrase(phraseIndex);
      }
      
      // Si todo está cargado, mostrar el botón
      if (animationLoaded && loadedVideos === totalVideos) {
        setShowButton(true);
      }
    };
    
    updateProgress();
    
    // Ejecutar la actualización cada 200ms para mantener la barra de progreso fluida
    const intervalId = setInterval(updateProgress, 200);
    return () => clearInterval(intervalId);
  }, [animationLoaded, videosLoaded, videoLoadProgress, currentPhrase, magicPhrases.length]);

  const handleIframeLoad = () => {
    // Dar tiempo para que la animación del dragón se inicialice completamente
    setTimeout(() => {
      setAnimationLoaded(true);
    }, 100);
  };

  // Manejar mensajes del iframe del dragón
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'dragonLoaded') {
        setAnimationLoaded(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Iniciar la precarga de videos cuando el componente se monte
  useEffect(() => {
    preloadVideos();
  }, []);

  return (
    <div id="preload">
      {/* Animación del dragón en iframe */}
      <div className="dragon-section">
        <iframe
          src="/assets/dragon/dragon.html"
          className="dragon-iframe"
          onLoad={handleIframeLoad}
          title="Dragon Animation"
          loading="eager"
        />
      </div>
      <div id="loading-container">
        <div id="loading-bar">
          <div id="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <div id="progress-container">
          <span id="progress-text">{Math.round(progress)}%</span>
        </div>
      </div>

      <div id="loading-text">
        {magicPhrases[currentPhrase]}
      </div>

      {showButton && (
        <button id="continue-button" onClick={onContinue}>
          ¡Continuar la aventura!
        </button>
      )}
    </div>
  );
}