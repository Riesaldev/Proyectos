import { useState, useEffect } from 'react';

export const useLoadingProgress = (animationLoaded, videosLoaded, videoLoadProgress) => {
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [showButton, setShowButton] = useState(false);

  // Configuración de precarga
  const preloadConfig = {
    totalVideos: 7,
    dragonProgressWeight: 30,
    videoProgressWeight: 70,
    phraseChangeInterval: 3000,
    progressUpdateInterval: 200,
    totalPhrases: 5
  };

  // Función para actualizar el progreso general
  useEffect(() => {
    const updateProgress = () => {
      const loadedVideos = Object.values(videosLoaded).filter(loaded => loaded).length;
      
      // Calcular el progreso basado tanto en videos completos como en progreso parcial
      const videoProgressValues = Object.values(videoLoadProgress);
      const videoProgressAverage = videoProgressValues.reduce((acc, val) => acc + val, 0) / preloadConfig.totalVideos;
      
      // El progreso se divide en dos partes:
      // 1. Progreso del dragón (30%)
      const dragonProgress = animationLoaded ? preloadConfig.dragonProgressWeight : 0;
      // 2. Progreso de los videos (70%)
      const videosProgress = videoProgressAverage * (preloadConfig.videoProgressWeight / 100);

      // Progreso total
      const totalProgress = Math.min(dragonProgress + videosProgress, 99); // Limitamos a 99% hasta que todo esté listo
      
      // Solo mostramos 100% cuando todo está realmente cargado
      const finalProgress = (animationLoaded && loadedVideos === preloadConfig.totalVideos) ? 100 : totalProgress;
      
      setProgress(finalProgress);
      
      // Actualizar la frase basada en el tiempo
      const phraseIndex = Math.floor(Date.now() / preloadConfig.phraseChangeInterval) % preloadConfig.totalPhrases;
      if (phraseIndex !== currentPhrase && phraseIndex < preloadConfig.totalPhrases) {
        setCurrentPhrase(phraseIndex);
      }
      
      // Si todo está cargado, mostrar el botón
      if (animationLoaded && loadedVideos === preloadConfig.totalVideos) {
        setShowButton(true);
      }
    };
    
    updateProgress();
    
    // Ejecutar la actualización cada 200ms para mantener la barra de progreso fluida
    const intervalId = setInterval(updateProgress, preloadConfig.progressUpdateInterval);
    return () => clearInterval(intervalId);
  }, [animationLoaded, videosLoaded, videoLoadProgress, currentPhrase]);

  return {
    progress,
    currentPhrase,
    showButton
  };
};
