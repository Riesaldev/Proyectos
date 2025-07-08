import { useState, useEffect } from 'react';
import { videoConfig } from '@/data/portalConfig';

export const useVideoPreloader = () => {
  const [videosPreloaded, setVideosPreloaded] = useState({
    main: false,
    dportal: false,
    iportal: false
  });

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

    setVideosPreloaded({
      main: mainCached,
      dportal: dportalCached,
      iportal: iportalCached
    });

    const updateCacheStatus = (videoSrc, key) => {
      const checkVideoLoaded = () => {
        console.log(`Video ${key} precargado`);
        setVideosPreloaded(prev => ({ ...prev, [key]: true }));
        sessionStorage.setItem(`video_${key}_cached`, 'true');
      };

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

    videoConfig.preloadSources.forEach(({ src, key }) => {
      const cached = sessionStorage.getItem(`video_${key}_cached`) === 'true';
      if (!cached) {
        updateCacheStatus(src, key);
      }
    });
  }, []);

  const VideoPreloader = () => {
    useEffect(() => {
      videoConfig.preloadSources.forEach(({ src, key }) => {
        if (sessionStorage.getItem(`video_${key}_cached`) !== 'true') {
          const tempVideo = document.createElement('video');
          tempVideo.preload = 'auto';
          tempVideo.src = src;
          tempVideo.muted = true;
          tempVideo.style.display = 'none';
          tempVideo.oncanplaythrough = () => {
            sessionStorage.setItem(`video_${key}_cached`, 'true');
            setVideosPreloaded(prev => {
              if (!prev[key]) return { ...prev, [key]: true };
              return prev;
            });
            document.body.removeChild(tempVideo);
          };
          document.body.appendChild(tempVideo);
        } else {
          setVideosPreloaded(prev => {
            if (!prev[key]) return { ...prev, [key]: true };
            return prev;
          });
        }
      });
    }, []);
    return null;
  };

  return {
    videosPreloaded,
    VideoPreloader
  };
};
