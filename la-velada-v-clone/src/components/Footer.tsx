import Link from "next/link";

//links
import X from "@/assets/svg/x.svg"
import G from "@/assets/svg/github.svg"
import Tw from "@/assets/svg/twitch.svg"
import Ti from "@/assets/svg/tiktok.svg"
//

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-screen h-[400px]" >
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-[url('/images/footer.webp')] [mask-image:linear-gradient(transparent,black_50%)]"
      >
      </div>

      <div
        className="relative h-full flex flex-col justify-center items-center text-white top-5 gap-2 "
      >

        <div>
          <h1
            className="text-center"
          >© 2025 La Velada del Año. Todos los derechos reservados.</h1>
        </div>

        <div className=" flex flex-row gap-3 justify-around items-center mt-5">
          <Link href="http://X.com/infoLaVelada" rel="noopener"
            className="w-10 h-10 flex justify-center items-center hover:scale-125 transition duration-300 hover:cursor-pointer"
          >
            <X />
          </Link>

          <Link href="http://github.com/la-velada-web-oficial" rel="noopener"
            className="w-10 h-10 flex justify-center items-center hover:scale-125 transition duration-300 hover:cursor-pointer"
          >
            <G />
          </Link>

          <Link href="http://twitch.com/infoLaVelada" rel="noopener"
            className="w-10 h-10 flex justify-center items-center hover:scale-125 transition duration-300 hover:cursor-pointer"
          >
            <Tw />
          </Link>

          <Link href="http://tiktok.com/infoLaVelada" rel="noopener"
            className="w-10 h-10 flex justify-center items-center hover:scale-125 transition duration-300 hover:cursor-pointer"
          >
            <Ti />
          </Link>

        </div>
      </div>
    </footer >
  );
};

