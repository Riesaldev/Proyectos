import { Info, Play } from "lucide-react";
import { Button } from "./ui/button";

const SliderVideo = () => {
    return (
        <div className="relative w-full h-[70vh] md:h-[66.25vw] lg:h-[45vw] ">
            <video
                src="/videos/video-trailer-test.mp4"
                className="brightness-50 object-fill h-[80vw] w-full md:h-[56.25vw] lg:h-[45vw]"
                autoPlay
                muted
                loop
            />
            <div className="flex flex-col justify-end absolute w-full md:w-[36%] px-4 md:px-0 md:left-[4%] z-20 top-0 -bottom-7 md:bottom-[36%] ">
                <div className="pt-24 md:pt-0">
                    <h2 className="text-2xl md:text-5xl lg:text-8xl font-bold drop-shadow-xl"> RiesalDev</h2>
                    <br />
                    <p className="max-w-md mt-2 text-xs md:text-base">Aprende desde cero a crear un clon de Netflix con todas sus funciones clave, desde la gestión de usuarios hasta la reproduccion de videos.</p>
                    <br />
                    <div className="flex flex-col md:flex-row gap-4 mt-5">
                        <Button size="lg" variant="secondary" className="w-[100%] md:w-[50%]">
                            <Play className="h-6 w-6 mr-2 fill-black" />
                            Reproducir
                        </Button>
                        <Button size="lg" className="w-[100%] md:w-[50%]">
                            <Info className="h-6 w-6 mr-2" />
                            Más información
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SliderVideo;
