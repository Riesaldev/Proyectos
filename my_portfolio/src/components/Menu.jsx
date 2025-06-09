

"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="focus:outline-none">
        <Image 
          src={menuOpen ? '/cruz.svg' : '/menu-hamburguesa.svg'} 
          alt="Menu" 
          width={40} 
          height={40}
          className="fill-white h-10 w-10"
        />
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link href="#about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleMenu}>
            About
          </Link>
          <Link href="#projects" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleMenu}>
            Projects
          </Link>
          <Link href="#contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleMenu}>
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;