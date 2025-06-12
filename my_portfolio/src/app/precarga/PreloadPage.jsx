"use client";
import { useState, useEffect } from "react";
import './preload.css';

export default function PreloadPage({ onContinue }) {
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);

  const magicPhrases = [
    "✨ Conjurando elementos mágicos...",
    "🔮 Preparando pociones de código...",
    "🌟 Invocando sprites y animaciones...",
    "🎭 Mezclando colores y texturas...",
    "🚀 Cargando la magia del desarrollo..."
  ];

  const handleIframeLoad = () => {
    // Dar tiempo para que la animación del dragón se inicialice completamente
    setTimeout(() => {
      setAnimationLoaded(true);
    }, 2000);
  };

  // Agregar este useEffect adicional en PreloadPage.jsx
useEffect(() => {
    const handleMessage = (event) => {
        if (event.data.type === 'dragonLoaded') {
            setAnimationLoaded(true);
        }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
}, []);

  useEffect(() => {
    if (!animationLoaded) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowButton(true);
          return 100;
        }

        const newProgress = prev + 2;
        const phraseIndex = Math.floor(newProgress / 20);
        if (phraseIndex !== currentPhrase && phraseIndex < magicPhrases.length) {
          setCurrentPhrase(phraseIndex);
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentPhrase, magicPhrases.length, animationLoaded]);

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

      <div id="loading-bar">
        <div id="progress" style={{ width: `${progress}%` }}></div>
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