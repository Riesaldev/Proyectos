"use client"
import { useState } from 'react'
import Image from 'next/image'


export default function Header() {

  const [open, setOpen] = useState(false)

  return (
    <header className="flex justify-between m-8 ">
      <div className="flex items-center gap-4 h-full w-full">
        <Image
          src="/shared/logo.svg"
          alt="Logo"
          width={40}
          height={40}

        />
      </div>
      <div className="flex items-center justify-end gap-4 h-full w-full">
        <button
          title='burger'
          onClick={() => setOpen(!open)}
          className="sm:hidden flex items-center justify-center w-10 h-10"
        >
          <Image
            src="/shared/icon-hamburger.svg"
            alt="menu"
            width={40}
            height={40}
          />
        </button>
        {/* Mobile */}
        {open && (
          <nav className="fixed top-0 right-0 h-full w-2/5 bg-white/10 backdrop-blur-md text-white flex flex-col items-end p-8 z-50 sm:hidden">
            <button
              title="close"
              onClick={() => setOpen(false)}
              className="mb-8 self-end"
            >
              <Image
                src="/shared/icon-close.svg"
                alt="close"
                width={40}
                height={40}
              />
            </button>
            <ul className="flex flex-col gap-8">
              <li>00 Home</li>
              <li>01 Destination</li>
              <li>02 Crew</li>
              <li>03 Technology</li>
            </ul>
          </nav>
        )}
      </div>
      <nav className="hidden sm:flex flex-row items-center bg-white/10 backdrop-blur-md justify-end w-full h-16 p-5 text-white">
        <ul className="flex flex-row gap-8">
          <li>00 Home</li>
          <li>01 Destination</li>
          <li>02 Crew</li>
          <li>03 Technology</li>
        </ul>
      </nav>
    </header>
  )
}
