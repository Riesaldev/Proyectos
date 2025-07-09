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
    top: '60%',
    left: '51.5%',
    transform: 'translate(-50%, -50%)',
    width: 'w-32 sm:w-40 md:w-48 lg:w-56 xl:w-76',
    height: 'h-48 sm:h-60 md:h-72 lg:h-84 xl:h-170'
  },
  right: {
    // Posición del portal derecho en la imagen
    top: '58%',
    right: '48.5%',
    transform: 'translateY(-50%)',
    width: 'w-28 sm:w-36 md:w-44 lg:w-52 xl:w-100',
    height: 'h-40 sm:h-52 md:h-64 lg:h-76 xl:h-150'
  },
  left: {
    // Posición del portal izquierdo en la imagen
    top: '62%',
    left: '50%',
    transform: 'translateY(-50%)',
    width: 'w-24 sm:w-32 md:w-40 lg:w-48 xl:w-80',
    height: 'h-36 sm:h-48 md:h-60 lg:h-72 xl:h-150'
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

  // Alternar entre posicionamiento relativo y absoluto
  const usePrecisePositioning = true; // Cambiar a false para usar posicionamiento relativo

  // Función para crear áreas clicables con posicionamiento absoluto preciso
  const createPrecisePortalArea = (portalType, href) => {
    const config = portalPositions[portalType];
    if (!config) return null;

    const style = {
      top: config.top,
      left: config.left,
      right: config.right,
      transform: config.transform
    };

    return (
      <Link href={href}>
        <div 
          className={`absolute ${config.width} ${config.height} border-2 border-fuchsia-500 border-opacity-70 cursor-pointer transition-all duration-300 ease-in-out  hover:shadow-2xl hover:shadow-fuchsia-500 z-10`}
          style={style}
        >
        </div>
      </Link>
    );
  };

  // Función para crear portales con posicionamiento preciso usando portalPositions
  const createAbsolutePortalArea = (portalType, href) => {
    const config = portalPositions[portalType];
    if (!config) return null;

    const style = {
      position: 'absolute',
      top: config.top,
      left: config.left,
      right: config.right,
      transform: config.transform,
      zIndex: 40
    };

    return (
      <Link href={href} key={`portal-${portalType}`}>
        <div 
          className={`${config.width} ${config.height} border-2 border-fuchsia-500 border-opacity-70 hover:border-opacity-100 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-500/50`}
          style={style}
        >
        </div>
      </Link>
    );
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
            <div className="absolute h-screen top-1/12 sm:top-1/10 md:top-1/12 lg:top-1/12 flex w-full justify-center items-center overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="Portal flex flex-col items-center justify-center">
                <div className="text-[#812286] flex flex-col pl-15 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-black text-center">
                  {t('portals.main.portalText')}<br />
                  <span className='font-normal text-xs sm:text-sm md:text-base lg:text-lg'>{t('portals.main.portalSubtext')}</span>
                </div>
                {/* Área clicable del portal principal - posicionada sobre el portal en la imagen */}
                {createPrecisePortalArea("main", portalContent.main.href)}
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
            <div className="absolute h-screen top-1/10 sm:top-1/12 md:top-1/10 lg:top-1/10 flex w-full justify-center items-center overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="Portal flex flex-col items-center justify-center">
                <div className="text-[#812286] flex flex-col pr-85 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-black text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
                  {t('portals.right.portalText')}<br />
                  <span className='font-normal text-xs sm:text-sm md:text-base lg:text-lg'>{t('portals.right.portalSubtext')}</span>
                </div>
                {/* Área clicable del portal derecho - posicionada sobre el portal en la imagen */}
                {createPrecisePortalArea("right", portalContent.Right.href)}
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
            <div className="absolute h-screen top-1/14 sm:top-1/12 md:top-1/14 lg:top-1/14 flex w-full justify-center items-center overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="Portal flex flex-col items-center justify-center">
                <div className="text-[#812286] flex flex-col pl-85 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-black text-center mb-2 sm:mb-3 md:mb-4 lg:mb-4">
                  {t('portals.left.portalText')}<br />
                  <span className='font-normal text-xs sm:text-sm md:text-base lg:text-lg'>{t('portals.left.portalSubtext')}</span>
                </div>
                {/* Área clicable del portal izquierdo - posicionada sobre el portal en la imagen */}
                {createPrecisePortalArea("left", portalContent.Left.href)}
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
      
      {/* Posicionamiento absoluto preciso de portales - DESACTIVADO para evitar zonas clicables duplicadas */}
      {false && usePrecisePositioning && (
        <>
          {currentPortal === "main" && createAbsolutePortalArea('main', portalContent.main.href)}
          {currentPortal === "Right" && createAbsolutePortalArea('right', portalContent.Right.href)}
          {currentPortal === "Left" && createAbsolutePortalArea('left', portalContent.Left.href)}
        </>
      )}
      
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
