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
  const [videoLoadProgress, setVideoLoadProgress] = useState({
    main: 0,
    dportal: 0,
    iportal: 0,
    puerta: 0,
  });

  const magicPhrases = [
    "✨ Conjurando elementos mágicos...",
    "🔮 Preparando pociones de código...",
    "🌟 Invocando sprites y animaciones...",
    "🎭 Mezclando colores y texturas...",
    "🚀 Cargando la magia del desarrollo..."
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
      
      // Forzar al navegador a cachear el video
      video.setAttribute('crossorigin', 'anonymous'); // Permite CORS para caché
      video.preload = 'auto'; // Fuerza la precarga
      
      // Añadir un listener para el progreso de carga
      video.addEventListener('progress', (event) => {
        if (video.buffered.length > 0) {
          try {
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
      
      // Cuando el video esté listo para reproducirse
      video.addEventListener('canplaythrough', () => {
        console.log(`${key} video fully loaded and cached`);
        
        // Crear un objeto en sessionStorage para marcar que el video está cacheado
        sessionStorage.setItem(`video_${key}_cached`, 'true');
        
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
      
      // Manejar errores
      video.addEventListener('error', (error) => {
        console.error(`Error cargando ${key} video:`, error);
      });
      
      // Establecer la fuente y comenzar la carga
      video.src = url;
      video.load(); // Esto inicia la carga del video
      
      // Añadir al DOM para que el navegador no lo limpie de la memoria
      video.style.display = 'none';
      document.body.appendChild(video);
      
      // Guardar referencia para limpieza posterior
      return () => {
        if (document.body.contains(video)) {
          document.body.removeChild(video);
        }
      };
    });
  };
  
  // Función para actualizar el progreso general
  useEffect(() => {
    const updateProgress = () => {
      const totalVideos = 4; // Número total de videos a cargar
      
      // Calcular el progreso basado tanto en videos completos como en progreso parcial
      const videoProgressValues = Object.values(videoLoadProgress);
      const videoProgressAverage = videoProgressValues.reduce((acc, val) => acc + val, 0) / totalVideos;
      
      // El progreso se divide: 50% para la animación del dragón y 50% para los videos
      const dragonProgress = animationLoaded ? 50 : 0;
      const videosProgress = videoProgressAverage * 0.5; // 50% del progreso total
      
      // Progreso total
      const totalProgress = Math.min(dragonProgress + videosProgress, 99); // Limitamos a 99% hasta que todo esté listo
      
      // Solo mostramos 100% cuando todo esté realmente cargado
      const loadedVideos = Object.values(videosLoaded).filter(loaded => loaded).length;
      const finalProgress = (animationLoaded && loadedVideos === totalVideos) ? 100 : totalProgress;
      
      setProgress(finalProgress);
      
      // Actualizar la frase basada en el progreso
      const phraseIndex = Math.floor(finalProgress / 20);
      if (phraseIndex !== currentPhrase && phraseIndex < magicPhrases.length) {
        setCurrentPhrase(phraseIndex);
      }
      
      // Si todo está cargado, mostrar el botón
      if (animationLoaded && loadedVideos === totalVideos) {
        setShowButton(true);
      }
    };
    
    updateProgress();
    
    // Actualizar cada 200ms para mantener la barra fluida
    const intervalId = setInterval(updateProgress, 200);
    return () => clearInterval(intervalId);
  }, [animationLoaded, videosLoaded, videoLoadProgress, currentPhrase, magicPhrases.length]);

  // Iniciar la precarga de videos cuando el componente se monte
  useEffect(() => {
    preloadVideos();
  }, []);

  // Resto del componente...
}