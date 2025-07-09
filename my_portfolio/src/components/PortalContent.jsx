import Link from 'next/link';
import { useState } from 'react';
import React from 'react';
import { useI18n } from './I18nProvider';
import { portalContent } from '@/data/portalConfig';
import MagicCard from './MagicCard';

// Configuración de posicionamiento preciso de portales sobre la imagen de fondo
const portalPositions = {
  main: {
    // Posición del portal principal en la imagen
    top: '45%', // Ajustar según la posición en la imagen
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64',
    height: 'h-48 sm:h-60 md:h-72 lg:h-84 xl:h-96'
  },
  right: {
    // Posición del portal derecho en la imagen
    top: '50%', // Ajustar según la posición en la imagen
    right: '25%', // Ajustar según la posición en la imagen
    transform: 'translateY(-50%)',
    width: 'w-28 sm:w-36 md:w-44 lg:w-52 xl:w-60',
    height: 'h-40 sm:h-52 md:h-64 lg:h-76 xl:h-88'
  },
  left: {
    // Posición del portal izquierdo en la imagen
    top: '50%', // Ajustar según la posición en la imagen
    left: '25%', // Ajustar según la posición en la imagen
    transform: 'translateY(-50%)',
    width: 'w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56',
    height: 'h-36 sm:h-48 md:h-60 lg:h-72 xl:h-84'
  }
};

const PortalContent = ({ currentPortal, onPortalClick }) => {
  const { t } = useI18n();
  const [showCard, setShowCard] = useState(true); // Mostrar la card por defecto
  const [cardContent, setCardContent] = useState({ title: '', content: '' });

  // Establecer contenido inicial basado en currentPortal
  React.useEffect(() => {
    console.log("🟡 PortalContent useEffect - currentPortal:", currentPortal);
    switch (currentPortal) {
      case "main":
        setCardContent({
          title: t('portals.main.title'),
          content: `${t('portals.main.description')}\n\n${t('portals.main.subtitle')}`
        });
        break;
      case "Right":
        setCardContent({
          title: t('portals.right.title'),
          content: `${t('portals.right.description')}\n\n${t('portals.right.subtitle')}`
        });
        break;
      case "Left":
        setCardContent({
          title: t('portals.left.title'),
          content: `${t('portals.left.description')}\n\n${t('portals.left.subtitle')}`
        });
        break;
      default:
        setCardContent({ title: '', content: '' });
    }
    setShowCard(true); // Mostrar la card cuando cambie el portal
  }, [currentPortal, t]);

  const closeCard = () => {
    setShowCard(false);
  };

  const renderPortalContent = () => {
    switch (currentPortal) {
      case "main":
        return (
          <>
            {/* Sistema de Flechas de Navegación */}
            <div className="fixed inset-0 pointer-events-none z-50">
              {/* Flecha Izquierda */}
              <button
                onClick={() => {
                  console.log("🔴 Flecha izquierda clickeada - llamando onPortalClick('left')");
                  onPortalClick("left");
                }}
                className="absolute top-1/2 left-4 sm:left-6 md:left-8 lg:left-12 xl:left-16 transform -translate-y-1/2 pointer-events-auto z-50 group"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 active:scale-95">
                  <img
                    src="/assets/arrow1.png"
                    alt="Flecha Izquierda"
                    className="w-full h-full object-contain rotate-180 drop-shadow-lg"
                    draggable={false}
                  />
                </div>
              </button>

              {/* Flecha Derecha */}
              <button
                onClick={() => {
                  console.log("🔵 Flecha derecha clickeada - llamando onPortalClick('right')");
                  onPortalClick("right");
                }}
                className="absolute top-1/2 right-4 sm:right-6 md:right-8 lg:right-12 xl:right-16 transform -translate-y-1/2 pointer-events-auto z-50 group"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 active:scale-95">
                  <img
                    src="/assets/arrow1.png"
                    alt="Flecha Derecha"
                    className="w-full h-full object-contain drop-shadow-lg"
                    draggable={false}
                  />
                </div>
              </button>
            </div>

            {/* Portal Central */}
            <div className="absolute top-1/12 sm:top-1/10 md:top-1/12 lg:top-1/12 flex w-full justify-center items-center overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="Portal flex flex-col items-center justify-center">
                <div className="text-[#812286] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-black text-center">
                  {t('portals.main.portalText')}<br />
                  <span className='font-normal text-xs sm:text-sm md:text-base lg:text-lg'>{t('portals.main.portalSubtext')}</span>
                </div>
                {/* Área clicable del portal principal - posicionada sobre el portal en la imagen */}
                <Link href={portalContent.main.href}>
                  <div className="relative mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24">
                    <div className="w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72 lg:w-56 lg:h-84 xl:w-64 xl:h-96 border-2 border-fuchsia-500 border-opacity-70 hover:border-opacity-100 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-500/50">
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </>
        );

      case "Right":
        return (
          <>
            {/* Sistema de Flechas de Navegación */}
            <div className="fixed inset-0 pointer-events-none z-50">
              {/* Flecha Volver */}
              <button
                onClick={() => {
                  console.log("🔙 Flecha volver clickeada - llamando onPortalClick('main')");
                  onPortalClick("main");
                }}
                className="absolute top-1/2 left-4 sm:left-6 md:left-8 lg:left-12 xl:left-16 transform -translate-y-1/2 pointer-events-auto z-50 group"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 active:scale-95">
                  <img
                    src="/assets/arrow1.png"
                    alt="Volver"
                    className="w-full h-full object-contain rotate-180 drop-shadow-lg"
                    draggable={false}
                  />
                </div>
              </button>
            </div>

            {/* Portal Right */}
            <div className="absolute top-1/10 sm:top-1/12 md:top-1/10 lg:top-1/10 flex w-full justify-center items-center overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="Portal flex flex-col items-center justify-center">
                <div className="text-[#812286] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-black text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
                  {t('portals.right.portalText')}<br />
                  <span className='font-normal text-xs sm:text-sm md:text-base lg:text-lg'>{t('portals.right.portalSubtext')}</span>
                </div>
                {/* Área clicable del portal derecho - posicionada sobre el portal en la imagen */}
                <Link href={portalContent.Right.href}>
                  <div className="w-28 h-40 sm:w-36 sm:h-52 md:w-44 md:h-64 lg:w-52 lg:h-76 xl:w-60 xl:h-88 border-2 border-fuchsia-500 border-opacity-70 hover:border-opacity-100 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-500/50">
                  </div>
                </Link>
              </div>
            </div>
          </>
        );

      case "Left":
        return (
          <>
            {/* Sistema de Flechas de Navegación */}
            <div className="fixed inset-0 pointer-events-none z-50">
              {/* Flecha Volver */}
              <button
                onClick={() => {
                  console.log("🔙 Flecha volver clickeada - llamando onPortalClick('main')");
                  onPortalClick("main");
                }}
                className="absolute top-1/2 right-4 sm:right-6 md:right-8 lg:right-12 xl:right-16 transform -translate-y-1/2 pointer-events-auto z-50 group"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 active:scale-95">
                  <img
                    src="/assets/arrow1.png"
                    alt="Volver"
                    className="w-full h-full object-contain drop-shadow-lg"
                    draggable={false}
                  />
                </div>
              </button>
            </div>

            {/* Portal Left */}
            <div className="absolute top-1/14 sm:top-1/12 md:top-1/14 lg:top-1/14 flex w-full justify-center items-center overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="Portal flex flex-col items-center justify-center">
                <div className="text-[#812286] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-black text-center mb-2 sm:mb-3 md:mb-4 lg:mb-4">
                  {t('portals.left.portalText')}<br />
                  <span className='font-normal text-xs sm:text-sm md:text-base lg:text-lg'>{t('portals.left.portalSubtext')}</span>
                </div>
                {/* Área clicable del portal izquierdo - posicionada sobre el portal en la imagen */}
                <Link href={portalContent.Left.href}>
                  <div className="w-24 h-36 sm:w-32 sm:h-48 md:w-40 md:h-60 lg:w-48 lg:h-72 xl:w-56 xl:h-84 cursor-pointer border-2 border-fuchsia-500 border-opacity-70 hover:border-opacity-100 mt-2 sm:mt-4 md:mt-6 lg:mt-8 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-500/50">
                  </div>
                </Link>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden">
      {renderPortalContent()}
      
      <MagicCard
        isOpen={showCard}
        onClose={closeCard}
        title={cardContent.title}
        glowIntensity="medium"
        showParticles={true}
      >
        <div className="space-y-4">
          <p className="text-fuchsia-50/90 leading-relaxed whitespace-pre-line text-sm sm:text-base">
            {cardContent.content}
          </p>
          
          <div className="mt-6 text-center">
            <p className="text-xs sm:text-sm text-fuchsia-200/80">
              ✨ Información del Portal ✨
            </p>
          </div>
        </div>
      </MagicCard>
    </div>
  );
};

export default PortalContent;
