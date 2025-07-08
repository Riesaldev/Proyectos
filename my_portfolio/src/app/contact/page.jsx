"use client";
import Header from "@/components/Header";
import Sword from "../../../public/videos/Sword.webm";
import Ancient from "@/components/Ancient";
import ContactForm from "@/components/ContactForm";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { usePageNavigation } from "@/hooks/usePageNavigation";
import { contactScrollContents } from "@/data/contactScrollContents";

export default function Page() {
  // Hook para manejar la lógica del video con velocidad personalizada
  const {
    videoRef,
    videoSpeed,
    setVideoSpeed,
    videoLoaded,
    isEnded,
    fadeIn,
    skipHintVisible,
    handleSkipVideo,
  } = useVideoPlayer(0.75);

  // Hook para manejar la navegación entre páginas
  const {
    currentPage,
    transitionActive,
    changePage,
    goToPage,
  } = usePageNavigation(contactScrollContents.length);
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="cover absolute inset-0 z-0">
        <video
          autoPlay
          muted
          className="w-full h-full object-cover"
          ref={videoRef}
        >
          <source src={Sword} type="video/webm" />
          Tu navegador no soporta el elemento video.
        </video>
        
        {/* Overlay clickeable para saltar el video */}
        {!isEnded && (
          <div 
            className="absolute inset-0 cursor-pointer flex items-center justify-center"
            onClick={handleSkipVideo}
          >
            {skipHintVisible && (
              <div className="bg-fuchsia-500/60  text-white px-4 py-2 rounded-full text-sm font-medium transition-opacity duration-500 hover:bg-opacity-70">
                Clic para saltar la intro
              </div>
            )}
          </div>
        )}
      </div>
      <div className="relative z-10">
        <div className="opacity-80">
          <Header />
        </div>
        {isEnded && (
          <div 
            className="transition-all duration-1500 ease-in-out"
            style={{ 
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="relative">
              <Ancient
                title={contactScrollContents[currentPage].title}
                content={contactScrollContents[currentPage].content}
                currentPage={currentPage}
                scrollContents={contactScrollContents}
                onChangePage={changePage}
                onGoToPage={goToPage}
                transitionActive={transitionActive}
                customComponent={contactScrollContents[currentPage].hasCustomComponent ? <ContactForm /> : null}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}