import { useState, useEffect } from 'react';
import { preloadConfig } from '@/data/portalConfig';
import { preloadResourcesConfig, getAllResources } from '@/data/preloadResourcesConfig';

export const useLoadingProgress = (animationLoaded, videosLoaded, videoLoadProgress) => {
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState({
    images: false,
    audio: false,
    fonts: false,
    critical: false,
    locales: false
  });

  // Obtener todos los recursos a precargar
  const resources = getAllResources();

  // Función para precargar imágenes con timeout y reintentos
  const preloadImages = async () => {
    try {
      const totalImages = resources.images.length;
      let loadedImages = 0;

      const imagePromises = resources.images.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const timeout = setTimeout(() => {
            reject(new Error(`Image timeout: ${src}`));
          }, preloadResourcesConfig.timeouts.image);

          img.onload = () => {
            clearTimeout(timeout);
            loadedImages++;
            // Actualizar progreso gradualmente
            if (loadedImages === totalImages) {
              setResourcesLoaded(prev => ({ ...prev, images: true }));
            }
            resolve(src);
          };
          img.onerror = () => {
            clearTimeout(timeout);
            loadedImages++;
            // Continuar aunque falle
            if (loadedImages === totalImages) {
              setResourcesLoaded(prev => ({ ...prev, images: true }));
            }
            reject(new Error(`Failed to load image: ${src}`));
          };
          img.src = src;
        });
      });

      await Promise.allSettled(imagePromises);
    } catch (error) {
      console.error('Error preloading images:', error);
      setResourcesLoaded(prev => ({ ...prev, images: true }));
    }
  };

  // Función para precargar audio con metadata
  const preloadAudio = async () => {
    try {
      const audioPromises = resources.audio.map(src => {
        return new Promise((resolve, reject) => {
          const audio = new Audio();
          const timeout = setTimeout(() => {
            reject(new Error(`Audio timeout: ${src}`));
          }, preloadResourcesConfig.timeouts.audio);

          audio.oncanplaythrough = () => {
            clearTimeout(timeout);
            resolve(src);
          };
          audio.onerror = () => {
            clearTimeout(timeout);
            reject(new Error(`Failed to load audio: ${src}`));
          };
          audio.preload = 'metadata';
          audio.src = src;
        });
      });

      await Promise.allSettled(audioPromises);
      setResourcesLoaded(prev => ({ ...prev, audio: true }));
    } catch (error) {
      console.error('Error preloading audio:', error);
      setResourcesLoaded(prev => ({ ...prev, audio: true }));
    }
  };

  // Función para precargar fuentes
  const preloadFonts = async () => {
    try {
      const fontPromises = resources.fonts.map(href => {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error(`Font timeout: ${href}`));
          }, preloadResourcesConfig.timeouts.font);

          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          link.onload = () => {
            clearTimeout(timeout);
            resolve(href);
          };
          link.onerror = () => {
            clearTimeout(timeout);
            reject(new Error(`Failed to load font: ${href}`));
          };
          
          // Verificar si ya existe
          if (!document.querySelector(`link[href="${href}"]`)) {
            document.head.appendChild(link);
          } else {
            clearTimeout(timeout);
            resolve(href);
          }
        });
      });

      await Promise.allSettled(fontPromises);
      setResourcesLoaded(prev => ({ ...prev, fonts: true }));
    } catch (error) {
      console.error('Error preloading fonts:', error);
      setResourcesLoaded(prev => ({ ...prev, fonts: true }));
    }
  };

  // Función para precargar recursos críticos
  const preloadCriticalResources = async () => {
    try {
      const criticalPromises = resources.critical.map(src => {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error(`Critical resource timeout: ${src}`));
          }, preloadResourcesConfig.timeouts.critical);

          fetch(src)
            .then(response => {
              clearTimeout(timeout);
              if (response.ok) {
                resolve(src);
              } else {
                reject(new Error(`Failed to load: ${src}`));
              }
            })
            .catch(error => {
              clearTimeout(timeout);
              reject(error);
            });
        });
      });

      await Promise.allSettled(criticalPromises);
      setResourcesLoaded(prev => ({ ...prev, critical: true }));
    } catch (error) {
      console.error('Error preloading critical resources:', error);
      setResourcesLoaded(prev => ({ ...prev, critical: true }));
    }
  };

  // Función para precargar archivos de localización
  const preloadLocales = async () => {
    try {
      const localePromises = resources.locales.map(src => {
        return new Promise((resolve, reject) => {
          fetch(src)
            .then(response => response.ok ? resolve(src) : reject(new Error(`Failed to load locale: ${src}`)))
            .catch(reject);
        });
      });

      await Promise.allSettled(localePromises);
      setResourcesLoaded(prev => ({ ...prev, locales: true }));
    } catch (error) {
      console.error('Error preloading locales:', error);
      setResourcesLoaded(prev => ({ ...prev, locales: true }));
    }
  };

  // Iniciar precarga de todos los recursos
  useEffect(() => {
    preloadImages();
    preloadAudio();
    preloadFonts();
    preloadCriticalResources();
    preloadLocales();
  }, []);

  useEffect(() => {
    // Usar pesos de progreso de la configuración
    const weights = preloadResourcesConfig.progressWeights;

    // Calcular progreso del dragón
    const dragonProgress = animationLoaded ? weights.dragon : 0;

    // Calcular progreso de videos
    const videoProgressValues = Object.values(videoLoadProgress);
    const totalVideoProgress = videoProgressValues.reduce((sum, progress) => sum + progress, 0);
    const avgVideoProgress = totalVideoProgress / preloadConfig.totalVideos;
    const videoProgress = (avgVideoProgress * weights.videos) / 100;

    // Calcular progreso de otros recursos
    const imageProgress = resourcesLoaded.images ? weights.images : 0;
    const audioProgress = resourcesLoaded.audio ? weights.audio : 0;
    const fontProgress = resourcesLoaded.fonts ? weights.fonts : 0;
    const criticalProgress = resourcesLoaded.critical ? weights.critical : 0;
    const localesProgress = resourcesLoaded.locales ? (weights.locales || 0) : 0;

    // Progreso total
    const totalProgress = dragonProgress + videoProgress + imageProgress + audioProgress + fontProgress + criticalProgress + localesProgress;
    setProgress(Math.min(totalProgress, 100));

    // Mostrar botón cuando todo esté cargado
    const allVideosLoaded = Object.values(videosLoaded).every(loaded => loaded);
    const allResourcesLoaded = Object.values(resourcesLoaded).every(loaded => loaded);
    setShowButton(animationLoaded && allVideosLoaded && allResourcesLoaded && totalProgress >= 100);

  }, [animationLoaded, videosLoaded, videoLoadProgress, resourcesLoaded]);

  // Efecto separado para cambiar frases automáticamente mientras se carga
  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhrase(prev => (prev + 1) % 5); // Ciclar entre las 5 frases continuamente
    }, 2500); // Cambiar cada 2.5 segundos

    return () => {
      clearInterval(phraseInterval);
    };
  }, []); // Sin dependencias para que siga funcionando siempre

  return {
    progress,
    currentPhrase,
    showButton,
    resourcesLoaded
  };
};
