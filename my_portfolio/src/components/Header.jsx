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
      <nav className="flex justify-around items-center w-full">
        <div className="flex items-start">
          <Link href="/" className="flex items-center">
            <Image
            src="/LOGO.svg"
            alt="Logo"
            width={20}
            height={10}
            className='h-26 w-26 hover:scale-120 transition-transform duration-300 ease-in-out'
            />
          </Link>
        </div>
        <div
        className="flex flex-col items-center transition-all duration-200 cursor-pointer"
        >
          <ul className="flex items-center justify-center">
            <li className="mx-4">
              <Link href="/about" className="text-[#fddbff] hover:underline">
                About Me
              </Link>
            </li>
            <li className="mx-4">
              <Link href="/projects" className="text-[#fddbff] hover:underline">
                Projects
              </Link>
            </li>
            <li className="mx-4">
              <Link href="/contact" className="text-[#fddbff] hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    </div>
    </>
  );
}

export default Header;