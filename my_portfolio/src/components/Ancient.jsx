import React from 'react';
import PropTypes from 'prop-types';


const AncientScroll = ({ 
  title, 
  content, 
  autoOpen = false, 
  width = "760px",
  height = "168px"
}) => {
  const [isOpen, setIsOpen] = React.useState(autoOpen);
  
  // Precarga las imágenes para mejor rendimiento
  const preloadImages = () => {
    const images = [
      '/assets/ancient1.png',
      '/assets/ancient2.png',
      '/assets/ancient3.png'
    ];
    
    images.forEach(src => {
      new Image().src = src;
    });
  };

  React.useEffect(() => {
    preloadImages();
    
    if (autoOpen) {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [autoOpen]);

  const toggleScroll = () => setIsOpen(!isOpen);

  return (
    <div 
      className="flex justify-center items-center"
      aria-expanded={isOpen}
      aria-label="Pergamino animado"
    >
      <div className="relative">
        {/* Parte superior del pergamino */}
        <div 
          className="mx-auto bg-[url('/assets/ancient1.png')] bg-cover bg-center cursor-pointer"
          style={{ width, height }}
          onClick={toggleScroll}
          role="button"
          tabIndex="0"
          onKeyDown={(e) => e.key === 'Enter' && toggleScroll()}
          aria-hidden="true"
        />
        
        {/* Parte central expandible */}
        <div
          className={`mx-auto bg-[url('/assets/ancient2.png')] bg-cover bg-top overflow-hidden transition-all duration-1000 ease-in-out ${isOpen ? 'h-[525px]' : 'h-[10px]'}`}
          style={{ width }}
        >
          <div 
            className={`h-full p-8 overflow-y-auto scrollbar transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#a67c52 #f3e7d3'
            }}
          >
            <div 
              className="text-black text-justify text-[15px] font-normal font-satisfy leading-[140%] pr-[10px]"
              onClick={toggleScroll}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => e.key === 'Enter' && toggleScroll()}
            >
              <h2 className="text-left font-bold text-[18px] mb-[10px]">
                {title}
              </h2>
              <div className="text-left">
                {content}
              </div>
            </div>
          </div>
        </div>
        
        {/* Parte inferior del pergamino */}
        <div 
          className="mx-auto -mt-[6px] bg-[url('/assets/ancient3.png')] bg-cover bg-center cursor-pointer"
          style={{ width, height }}
          onClick={toggleScroll}
          role="button"
          tabIndex="0"
          onKeyDown={(e) => e.key === 'Enter' && toggleScroll()}
          aria-hidden="true"
        />
        
        {/* Instrucción accesible */}
        <p className="sr-only">
          Presiona Enter o haz clic para {isOpen ? 'cerrar' : 'abrir'} el pergamino
        </p>
      </div>

      {/* Estilos para el scrollbar personalizado */}
      <style jsx>{`
        .scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar::-webkit-scrollbar-track {
          background: #f3e7d3;
          border-radius: 10px;
        }
        .scrollbar::-webkit-scrollbar-thumb {
          background: #a67c52;
          border-radius: 10px;
          border: 2px solid #f3e7d3;
        }
        .scrollbar::-webkit-scrollbar-thumb:hover {
          background: #8c6239;
        }
      `}</style>
    </div>
  );
};

AncientScroll.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  autoOpen: PropTypes.bool,
  width: PropTypes.string
};

export default AncientScroll;