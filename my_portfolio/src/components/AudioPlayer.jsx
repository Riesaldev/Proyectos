"use client";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useI18n } from "@/components/I18nProvider";

const AudioPlayer = ({ tracks }) => {
  const { t } = useI18n();
  const {
    audioRef,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isShuffled,
    isRepeating,
    isVisible,
    togglePlay,
    handleNextTrack,
    handlePrevTrack,
    handleSeek,
    handleVolumeChange,
    toggleShuffle,
    toggleRepeat,
    selectTrack,
    toggleVisibility,
    formatTime,
  } = useAudioPlayer(tracks);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} preload="metadata" />
      
      {/* Botón para mostrar/ocultar el reproductor */}
      <button
        onClick={toggleVisibility}
        className="mb-2 bg-purple-600/80 hover:bg-purple-700/80 text-white p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
        title={isVisible ? t('audio.hide') : t('audio.show')}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12 7-12 6z" />
        </svg>
      </button>

      {/* Reproductor expandido */}
      <div className={`
        bg-black/80 backdrop-blur-md rounded-lg p-4 shadow-xl transition-all duration-300
        ${isVisible ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0 pointer-events-none'}
        min-w-[300px] max-w-[400px]
      `}>
        {/* Información de la pista actual */}
        <div className="text-center mb-4">
          <h3 className="text-white font-semibold text-lg truncate">
            {tracks[currentTrack].title}
          </h3>
          <p className="text-gray-400 text-sm">
            {tracks[currentTrack].artist || t('audio.unknown')}
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2 cursor-pointer">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-150"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
            />
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="absolute w-full h-2 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Controles principales */}
        <div className="flex justify-center items-center gap-4 mb-4">
          {/* Botón anterior */}
          <button
            onClick={handlePrevTrack}
            className="text-white hover:text-purple-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.333 4z" />
            </svg>
          </button>

          {/* Botón play/pause */}
          <button
            onClick={togglePlay}
            className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-colors"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-3-9a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>

          {/* Botón siguiente */}
          <button
            onClick={handleNextTrack}
            className="text-white hover:text-purple-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
            </svg>
          </button>
        </div>

        {/* Controles secundarios */}
        <div className="flex justify-between items-center mb-4">
          {/* Shuffle */}
          <button
            onClick={toggleShuffle}
            className={`p-2 rounded transition-colors ${
              isShuffled ? 'text-purple-400' : 'text-gray-400 hover:text-white'
            }`}
            title={t('audio.shuffle')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4l11.733 16h4.267L9.267 4zm0 16L16 4l2.732 16z" />
            </svg>
          </button>

          {/* Control de volumen */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6.343 7.757L4.93 6.343A1 1 0 003.515 7.757l8.485 8.485a1 1 0 001.414-1.414L4.93 6.343z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Repeat */}
          <button
            onClick={toggleRepeat}
            className={`p-2 rounded transition-colors ${
              isRepeating ? 'text-purple-400' : 'text-gray-400 hover:text-white'
            }`}
            title={t('audio.repeat')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Lista de pistas */}
        <div className="max-h-32 overflow-y-auto">
          {tracks.map((track, index) => (
            <div
              key={index}
              onClick={() => selectTrack(index)}
              className={`
                flex items-center gap-3 p-2 rounded cursor-pointer transition-colors
                ${currentTrack === index ? 'bg-purple-600/30 text-purple-400' : 'text-gray-300 hover:bg-gray-700/50'}
              `}
            >
              <div className="flex-shrink-0">
                {currentTrack === index && isPlaying ? (
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="flex gap-1">
                      <div className="w-1 h-3 bg-purple-400 animate-pulse"></div>
                      <div className="w-1 h-2 bg-purple-400 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-4 bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm font-mono">{String(index + 1).padStart(2, '0')}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{track.title}</p>
                {track.artist && (
                  <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
