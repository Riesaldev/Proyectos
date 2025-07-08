"use client";
import { useState, useEffect } from "react";
import './preload.css';
import Main from '../../../public/videos/Portals.webm';
import DPortal from '../../../public/videos/DPortal.webm';
import IPortal from '../../../public/videos/IPortal.webm';
import PuertaVideo from '../../../public/videos/puerta.mp4';
import Lake from '../../../public/videos/Lake.webm';
import Lab from '../../../public/videos/Lab.webm';
import Sword from '../../../public/videos/Sword.webm';


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
    lake: false,
    lab: false,
    sword: false,
  });
  // Nuevo estado para seguir el progreso de carga de cada video
  const [videoLoadProgress, setVideoLoadProgress] = useState({
    main: 0,
    dportal: 0,
    iportal: 0,
    puerta: 0,
    lake: 0,
    lab: 0,
    sword: 0,
  });

  const magicPhrases = [
    "Conjurando el código...",
    "Elaborando pociones de UI...",
    "Invocando las animaciones...",
    "Domesticando bugs...",
    "Implorando a los Dioses Antiguos..."
  ];

  // Función para precargar videos usando la API Cache
  const preloadVideos = async () => {
    const videos = [
      { url: Main, key: 'main' },
      { url: DPortal, key: 'dportal' },
      { url: IPortal, key: 'iportal' },
      { url: PuertaVideo, key: 'puerta' },
      { url: Lake, key: 'lake' },
      { url: Lab, key: 'lab' },
      { url: Sword, key: 'sword' }
    ];

    try {
      // Intentar abrir o crear una caché específica para los videos
      const videoCache = await caches.open('video-cache-v1');
      
      // Para cada video, verificar si ya está en caché, y si no, añadirlo
      for (const { url, key } of videos) {
        try {
          // Convertir el import a string para obtener la URL real
          const videoUrl = url.toString();
          
          // Verificar si el video ya está en caché
          const cachedResponse = await videoCache.match(videoUrl);
          
          if (!cachedResponse) {
            console.log(`Cargando y guardando en caché: ${key}`);
            
            // Hacer una solicitud para el video
            const response = await fetch(videoUrl);
            
            if (response.ok) {
              // Guardar en caché
              await videoCache.put(videoUrl, response.clone());
              console.log(`${key} guardado en caché correctamente`);
              
              // Marcar como completamente cargado
              setVideosLoaded(prev => ({
                ...prev,
                [key]: true
              }));
              
              setVideoLoadProgress(prev => ({
                ...prev,
                [key]: 100
              }));
            } else {
              console.error(`Error cargando ${key}: ${response.statusText}`);
            }
          } else {
            console.log(`${key} ya está en caché`);
            
            // Si ya está en caché, marcarlo como cargado
            setVideosLoaded(prev => ({
              ...prev,
              [key]: true
            }));
            
            setVideoLoadProgress(prev => ({
              ...prev,
              [key]: 100
            }));
          }
        } catch (error) {
          console.error(`Error procesando ${key}:`, error);
        }
      }
    } catch (error) {
      console.error("Error accediendo a la caché:", error);
    }
  };

  // Función para actualizar el progreso general
  useEffect(() => {
    const updateProgress = () => {
      const totalVideos = 7; // Número total de videos a cargar
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
      
      // Solo mostramos 100% cuando todo está realmente cargado
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
          src="/dragon/dragon.html"
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