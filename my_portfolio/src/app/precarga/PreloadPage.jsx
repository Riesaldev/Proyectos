"use client";
import './preload.css';
import { useVideoPreload } from '@/hooks/useVideoPreload';
import { useLoadingProgress } from '@/hooks/useLoadingProgress';
import { useDragonAnimation } from '@/hooks/useDragonAnimation';
import { preloadConfig } from '@/data/preloadConfig';


export default function PreloadPage({ onContinue }) {
  // Hook para manejar la precarga de videos
  const { videosLoaded, videoLoadProgress } = useVideoPreload();
  
  // Hook para manejar la animación del dragón
  const { animationLoaded, handleIframeLoad } = useDragonAnimation();
  
  // Hook para manejar el progreso de carga
  const { progress, currentPhrase, showButton } = useLoadingProgress(
    animationLoaded,
    videosLoaded,
    videoLoadProgress
  );

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
        {preloadConfig.magicPhrases[currentPhrase]}
      </div>

      {showButton && (
        <button id="continue-button" onClick={onContinue}>
          ¡Continuar la aventura!
        </button>
      )}
    </div>
  );
}