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
    <footer className="fixed bottom-0 left-0 w-screen h-[400px]">
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-[url('/images/footer.webp')] [mask-image:linear-gradient(transparent,black_50%)]"
      >
      </div>

      <div
        className="relative h-full flex justify-center items-center text-white text-center "
      >

        <div className="flex flex-col justify-start items-center w-full h-full">

          <h1
            className="text-center text-lg text-[#2a1f26]"
          >
            © 2025 La Velada del Año. Todos los derechos reservados.
            </h1>


          <div className=" flex flex-row gap-3 justify-center items-center text-[#2a1f26] h-32">

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
        <div className="w-full absolute bottom-16 items-center justify-center ">
          <div className="w-2/5 gap-8 flex flex-col justify-center items-center">
            <h1 className="text-center text-xl text-[#2a1f26]">
              Patrocinadores del evento
            </h1>
            <div>
              <Sponsors />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex justify-center items-end h-12">
          <p className="text-center text-sm text-[#2a1f26]">
            Hecho con ❤️ por RiesalDev siguiendo el diseño de la web oficial de La Velada del Año V realizada por Midudev y la comunidad.
          </p>
        </div>
      </div>
    </footer >
  );
};

