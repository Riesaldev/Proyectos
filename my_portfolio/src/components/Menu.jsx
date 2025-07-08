

"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from './I18nProvider';

const MobileMenu = () => {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="focus:outline-none">
        <Image 
          src={menuOpen ? '/assets/cruz.svg' : '/assets/menu-hamburguesa.svg'} 
          alt={t('navigation.menu')} 
          width={40} 
          height={40}
          className="h-10 w-10 text-[#fddbff] "
        />
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#8e3796] rounded-md shadow-lg py-1 z-50 text-[#fddbff] text-xl">
          <Link href="#about" className="block px-4 py-2  hover:text-gray-100 hover:underline" onClick={toggleMenu}>
            {t('navigation.about')}
          </Link>
          <Link href="#projects" className="block px-4 py-2  hover:text-gray-100 hover:underline" onClick={toggleMenu}>
            {t('navigation.portfolio')}
          </Link>
          <Link href="#contact" className="block px-4 py-2  hover:text-gray-100 hover:underline" onClick={toggleMenu}>
            {t('navigation.contact')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;