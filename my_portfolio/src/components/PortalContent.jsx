import Link from 'next/link';
import { portalContent } from '@/data/portalConfig';

const PortalContent = ({ currentPortal, onPortalClick }) => {
  const renderPortalContent = () => {
    switch (currentPortal) {
      case "main":
        return (
          <>
            <div className="relative text-center flex flex-col items-center justify-center -right-8">
              <h1 className="text-4xl font-extrabold text-[#8653a8]">{portalContent.main.title}</h1>
              <p className="text-lg text-[#fddbff] w-1/2">{portalContent.main.description}</p>
              <span className="mt-6 relative text-[#fddbff] text-lg">
                {portalContent.main.subtitle}
              </span>
            </div>
            <div className="absolute bottom-5/12 flex space-x-54 items-center justify-center">
              <img
                src="/assets/arrow1.png"
                alt="Flecha Izquierda"
                className="w-24 h-24 rotate-180 top-[480px] relative cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
                onClick={() => onPortalClick("left")}
              />
              <div className="Portal flex flex-col top-[400px] -right-8 relative">
                <p className="text-[#812286] text-xl top-40 font-black text-center items-center relative">
                  {portalContent.main.portalText}<br />
                  <span className='font-normal text-base'>{portalContent.main.portalSubtext}</span>
                </p>
                <Link href={portalContent.main.href}>
                  <div className="w-84 h-160 cursor-pointer flex justify-center items-center">
                  </div>
                </Link>
              </div>
              <img
                src="/assets/arrow1.png"
                alt="Flecha Derecha"
                className="w-24 h-24 top-[480px] relative cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
                onClick={() => onPortalClick("right")}
              />
            </div>
          </>
        );

      case "Right":
        return (
          <>
            <div className="text-center flex flex-col items-center justify-center">
              <p className="text-[#812286] text-xl right-40 top-20 font-black text-center items-center relative">
                {portalContent.Right.title}<br />
                <span className='text-lg text-[#fddbff] flex mt-12'>{portalContent.Right.description}</span><br />
                <span className='font-normal text-base flex flex-col mt-12'>{portalContent.Right.subtitle}</span>
              </p>
              <div className="absolute bottom-1/2 top-[680px] flex space-x-54 items-center justify-center">
                <img
                  src="/assets/arrow1.png"
                  alt="Volver"
                  className="w-24 h-24 rotate-180 relative cursor-pointer right-84"
                  onClick={() => onPortalClick("main")}
                />
                <div className="Portal flex flex-col">
                  <Link href={portalContent.Right.href}>
                    <div className="w-94 h-200 cursor-pointer relative right-82">
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </>
        );

      case "Left":
        return (
          <>
            <div className="text-center flex flex-col items-center justify-center">
              <p className="text-[#812286] text-xl -right-40 top-20 font-black text-center items-center relative">
                {portalContent.Left.title}<br />
                <span className='text-lg text-[#fddbff] flex mt-12'>{portalContent.Left.description}</span><br />
                <span className='font-normal text-base flex flex-col mt-12'>{portalContent.Left.subtitle}</span>
              </p>
              <div className="absolute bottom-1/2 top-[680px] flex space-x-54 items-center justify-center">
                <div className="Portal flex flex-col">
                  <Link href={portalContent.Left.href}>
                    <div className="w-94 h-200 cursor-pointer relative -right-82">
                    </div>
                  </Link>
                </div>
                <img
                  src="/assets/arrow1.png"
                  alt="Volver"
                  className="w-24 h-24 relative cursor-pointer left-84"
                  onClick={() => onPortalClick("main")}
                />
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return renderPortalContent();
};

export default PortalContent;
