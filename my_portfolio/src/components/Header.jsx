"use client";

import Link from 'next/link';
import Image from 'next/image';
import Menu from './Menu';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <div className="top-0 sticky z-0 bg-[#a842b1] h-24 w-screen">
    <div className={`flex items-center z-30 transition-all h-24 duration-300 ${isScrolled ? 'bg-[#a842b1]/60 backdrop-blur-xs' : 'bg-[#a842b1]'}`}>
      <nav className="flex justify-between items-center w-full">
        <div className="flex items-start">
          <Link href="/" className="flex items-center">
            <Image
            src="/logo2.svg"
            alt="Logo"
            width={20}
            height={10}
            className='h-20 w-26 hover:scale-120 transition-transform duration-300 ease-in-out'
            />
          </Link>
        </div>
        <div
        className="items-center transition-all duration-200 cursor-pointer"
        >
          <h1 className={`text-4xl font-bold text-[#fddbff] ${isHovered ? 'animate-bounce-limited' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onAnimationEnd={() => setIsHovered(false)}>RiesalDev</h1>
          
        </div>
        <div className="m-10">
        <Menu />
        </div>
      </nav>
      
      <style>{`
        @keyframes bounce-limited {
          0%, 20%, 53%, 80%, 100% {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -30px, 0);
          }
          70% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -15px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }
        
        .animate-bounce-limited {
          animation: bounce-limited 1s ease-in-out;
        }
      `}</style>
    </div>
    </div>
    </>
  );
}

export default Header;