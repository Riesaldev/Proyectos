import Link from "next/link";
import { Sponsors } from "@/components/Sponsors";

//links
import X from "@/assets/svg/x.svg"
import G from "@/assets/svg/github.svg"
import Tw from "@/assets/svg/twitch.svg"
import Ti from "@/assets/svg/tiktok.svg"
//

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-screen h-[300px] z-40">
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-[url('/images/footer.webp')] [mask-image:linear-gradient(transparent,black_50%)]"
      >
      </div>

      <div
        className="relative h-full w-full flex flex-col"
      >

        <div className="justify-center items-center w-full h-auto flex flex-col gap-4">

            <h1
              className="text-center text-lg text-[#f7d8fd]"
            >
              © 2025 La Velada del Año. Todos los derechos reservados.
            </h1>


          <div className="w-auto flex gap-3 justify-center items-center text-[#f7d8fd]">

            <Link href="http://X.com/infoLaVelada" rel="noopener"
              className="w-8 h-8 flex justify-center items-center hover:scale-125 transition duration-300 hover:cursor-pointer"
            >
              <X />
            </Link>

            <Link href="http://github.com/la-velada-web-oficial" rel="noopener"
              className="w-8 h-8 flex justify-center items-center hover:scale-125 transition duration-300 hover:cursor-pointer"
            >
              <G />
            </Link>

            <Link href="http://twitch.com/infoLaVelada" rel="noopener"
              className="w-8 h-8 flex justify-center items-center hover:scale-125 transition duration-300 hover:cursor-pointer"
            >
              <Tw />
            </Link>

            <Link href="http://tiktok.com/infoLaVelada" rel="noopener"
              className="w-8 h-8 flex justify-center items-center hover:scale-125 transition duration-300 hover:cursor-pointer"
            >
              <Ti />
            </Link>

          </div>
        </div>
        <div className="w-full items-center justify-center lg:flex-row gap-8 h-auto">
          <div className="w-auto gap-8 justify-center items-center lg:w-2/5">
            <div>
              <Sponsors />
            </div>
          </div>
        </div>
        <div className="w-full justify-center items-center flex flex-col h-full">
          <p className="text-sm text-[#f7d8fd]">
            Hecho con ❤️ por RiesalDev siguiendo el diseño de la web oficial de La Velada del Año V realizada por Midudev y la comunidad.
          </p>
        </div>
      </div>
    </footer >
  );
};

