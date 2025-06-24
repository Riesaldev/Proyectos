"use client";
import { useState } from "react";
import PreloadPage from "./precarga/PreloadPage";
import LavenderFog from "../components/Three/LavenderFog";

export default function Home() {
  const [showHome, setShowHome] = useState(false);
  const [startScroll, setStartScroll] = useState(false);

  const handleScrollClick = () => {
    setStartScroll(true);
    setTimeout(() => {
      window.scrollBy({ top: 400, behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      {!showHome && <PreloadPage onContinue={() => setShowHome(true)} />}
      {showHome && (
        <main
        className={`flex flex-col items-center h-screen p-24 transition-colors duration-700 ${
          startScroll
          ? "bg-black"
          : "bg-gradient-to-b from-[#a842b1] from-70% to-[#2c002e]"
          } text-[#fddbff]`}
          >
          <LavenderFog />
          <div className="md:grid grid-cols-2 items-center justify-center w-full h-full p-6 my-8">
            {/* Letras y botón */}
            <div className={`text-center md:text-left md:pl-12 transition-opacity duration-500 ${
                startScroll ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}>
              <h1 className="text-4xl font-bold pb-4">Bienvenido a mi "Mundo"</h1>
              <p className="mt-4 text-lg">
                Soy un desarrollador web con pasión por crear sitios web hermosos y funcionales aunando diseño, tecnología, creatividad y por qué no... ¡Magia! Espero que disfruten de esta experiencia tanto como a mí me ha encantado hacerla.
              </p>
            </div>
            {/* Logo */}
            <div className="flex items-center justify-center mt-10">
              <img src="/logo1.svg" alt="Logo" className="h-62 w-auto min-w-96" />
            </div>
            {/* Botón */}
            <div className={`text-center md:text-left md:pl-12 mt-10 transition-opacity duration-500 ${
                startScroll ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}>
              <button
                type="button"
                aria-label="Scroll to bottom"
                onClick={handleScrollClick}
                className="bg-[#5a0856] text-[#fddbff] font-bold py-2 px-4 hover:shadow-fuchsia-400 shadow-md rounded-2xl hover:bg-[#670b7a] transition-all duration-300"
              >
                Sigamos adelante !!
              </button>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
