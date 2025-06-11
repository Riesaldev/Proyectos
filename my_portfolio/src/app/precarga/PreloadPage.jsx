"use client";
import { useState, useEffect } from "react";
import './preload.css';

export default function PreloadPage({ onContinue }) {
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const magicPhrases = [
    "✨ Conjurando elementos mágicos...",
    "🔮 Preparando pociones de código...",
    "🌟 Invocando sprites y animaciones...",
    "🎭 Mezclando colores y texturas...",
    "🚀 Cargando la magia del desarrollo..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowButton(true);
          return 100;
        }

        // Cambiar frase cada 20% de progreso
        const newProgress = prev + 2;
        const phraseIndex = Math.floor(newProgress / 20);
        if (phraseIndex !== currentPhrase && phraseIndex < magicPhrases.length) {
          setCurrentPhrase(phraseIndex);
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentPhrase, magicPhrases.length]);

  return (
    <div id="preload">
  <div id="background">
    <div id="mountains"></div>
    <div id="clouds"></div>
    <div id="valley"></div>
  </div>
  
  <div id="dragon">
    <div id="body"></div>
    <div id="wing-L"></div>
    <div id="wing-R"></div>
  </div>

  <div id="loading-bar">
    <div id="progress" style={{ width: `${progress}%` }}></div>
  </div>

  <p id="loading-text">{magicPhrases[currentPhrase]}</p>

  {showButton && (
    <button id="continue-button" onClick={onContinue}>
      ¡Continuar la aventura!
    </button>
  )}
</div>

  );
}
