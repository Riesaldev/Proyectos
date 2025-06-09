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
    <div className={`flex items-center p-6 top-0 sticky z-50 transition-all h-24 duration-300 ${isScrolled ? 'bg-[#a842b1]/60 backdrop-blur-xs' : 'bg-[#a842b1]'}`}>
      <nav className="flex justify-between items-center w-full">
        <div>
          <Link href="/" className="flex items-center">
            <Image
            src="/logo2.svg"
            alt="Logo"
            width={100}
            height={100}
            className='h-24 w-auto hover:scale-120 transition-transform duration-300'
            />
          </Link>
        </div>
        <div
        className="h-24 inline-flex items-center transition-all duration-200 cursor-pointer"
        >
          <h1 className={`text-4xl font-bold text-white ${isHovered ? 'animate-bounce-limited' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onAnimationEnd={() => setIsHovered(false)}>RiesalDev</h1>
          <button type='switch' className="ml-4 text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50 rounded-lg px-4 py-2 transition-colors duration-300">
            Toggle
          </button>
        </div>
        <Menu />
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
  );
}

export default Header;