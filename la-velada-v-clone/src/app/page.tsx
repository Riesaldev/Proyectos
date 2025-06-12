
export default function Home() {
  return (
      <div className="bg-[url('/images/hero.webp')] absolute bg-cover bg-bottom">
        <div className="w-screen h-screen flex">
          <div className="flex flex-col justify-start items-center w-full h-full p-4 m-4">
          <h1 className="text-4xl text-white font-bold">Bienvenido a La Velada del Año V</h1>
          <p className="text-lg text-white mt-4">La velada del Año V es un evento de boxeo benéfico organizado por Ibai Llanos, donde creadores de contenido se enfrentan en el ring para recaudar fondos para diversas causas.</p>
          <p className="text-lg text-white mt-4">Disfruta de la emoción, la rivalidad y el espectáculo en un evento que une a la comunidad de creadores.</p>
          <p className="text-lg text-white mt-4">¡No te pierdas la acción y acompáñanos en esta increíble velada!</p>
          </div>
        </div>
      </div>
  );
}
