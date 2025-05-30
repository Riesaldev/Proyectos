"use client"
import { useState } from 'react'
import Image from 'next/image'


export default function Header() {

  const [open, setOpen] = useState(false)

  return (
    <header className="flex m-10">
      <div className="flex items-center justify-center w-40 h-20">
        <Image
          src="/shared/logo.svg"
          alt="Logo"
          width={40}
          height={40}
          className="w-10 h-10 hover:cursor-pointer"

        />
      </div>
      <div className="flex justify-end items-center w-full ">
        <button
          title='burger'
          onClick={() => setOpen(!open)}
          className="sm:hidden flex items-center justify-center w-10 h-10 "
        >
          <Image
            src="/shared/icon-hamburger.svg"
            alt="menu"
            width={40}
            height={40}
            className="hover:cursor-pointer"
          />
        </button>
        {/* Mobile */}
        {open && (
          <nav className="fixed top-0 right-0 h-full w-2/5 bg-white/10 backdrop-blur-md text-white flex flex-col items-end py-14 px-10 z-50 sm:hidden ">
            <button
              title="close"
              onClick={() => setOpen(false)}
              className="mb-8 self-end hover:cursor-pointer"
            >
              <Image
                src="/shared/icon-close.svg"
                alt="close"
                width={40}
                height={40}
              />
            </button>
            <ul className="flex flex-col gap-8">
              <li className='hover:border-b hover:cursor-pointer'>00 Home</li>
              <li className='hover:border-b hover:cursor-pointer'>01 Destination</li>
              <li className='hover:border-b hover:cursor-pointer'>02 Crew</li>
              <li className='hover:border-b hover:cursor-pointer'>03 Technology</li>
            </ul>
          </nav>
        )}
      </div>
      <nav className="hidden sm:flex flex-row items-center bg-white/10 backdrop-blur-md justify-center w-full h-20 p-5 text-white ">
        <ul className="flex flex-row gap-12 text-sm font-[barlow] uppercase tracking-widest">
          <li className='hover:border-b hover:cursor-pointer'>00 Home</li>
          <li className='hover:border-b hover:cursor-pointer'>01 Destination</li>
          <li className='hover:border-b hover:cursor-pointer'>02 Crew</li>
          <li className='hover:border-b hover:cursor-pointer'>03 Technology</li>
        </ul>
      </nav>
    </header>
  )
}
