import { useEffect, useState, useRef } from 'react';

const Ancient = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
        contentRef.current.style.opacity = '1';
      } else {
        contentRef.current.style.maxHeight = '0';
        contentRef.current.style.opacity = '0';
      }
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center my-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 px-6 py-2 bg-amber-800 text-white rounded-md shadow-lg hover:bg-amber-900 transition-colors duration-300"
      >
        {isOpen ? 'Cerrar' : 'Abrir'}
      </button>
      <div
        ref={contentRef}
        className={`w-full max-w-3xl bg-amber-50 p-8 md:p-12 border-[15px] border-transparent shadow-lg text-amber-900 transition-all duration-1000 ease-in-out overflow-hidden max-h-0 opacity-0 relative before:content-[''] before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] before:opacity-30 scroll-style`}
        style={{
          borderImage: `url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><path d='M0,0 L100,0 L100,100 L0,100 Z' fill='none' stroke='%23b88b5e' stroke-width='10' stroke-dasharray='10,5' stroke-linecap='round' /></svg>") 20 stretch`
        }}
      >
        <h1 className="text-3xl md:text-2xl font-bold mb-6 text-center font-old-english border-b-2 border-amber-700 pb-4">
          {title}
        </h1>
        <div className="text-lg leading-relaxed font-serif space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Ancient;