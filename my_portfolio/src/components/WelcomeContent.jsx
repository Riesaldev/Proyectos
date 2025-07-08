/**
 * Componente para mostrar el contenido de bienvenida de la página principal
 * Contiene la información personal y la invitación a explorar el portafolio
 */
export default function WelcomeContent() {
  return (
    <div className="text-center md:text-left md:pl-12">
      <h1 className="text-4xl font-bold pb-4">Bienvenido a mi "Mundo"</h1>
      
      <p className="mt-4 text-lg">
        Soy un desarrollador web FullStack con pasión por crear sitios web hermosos y funcionales 
        aunando diseño, tecnología, creatividad y por qué no... ¡Magia!
      </p>
      
      <p className="mt-4 text-lg">
        Apasionado por la innovación, la mejora continua y el aprendizaje, por el diseño y el modelado, 
        por la experiencia del usuario y la accesibilidad. También me apasionan desde muy joven la 
        literatura y el cine de fantasía y la ciencia ficción, al igual que los juegos de rol y las 
        aventuras gráficas. Pero de lo que realmente soy un apasionado es de pasar tiempo de calidad 
        con mi hermosa familia.
      </p>
      
      <p className="mt-4 text-lg">
        Espero que disfruten de esta experiencia tanto como a mí me ha encantado hacerla
      </p>
      
      <p className="mt-4 text-lg">
        ¡¡¡Pasemos el umbral juntos y exploremos <strong>La Sala de los Portales</strong>!!! 
        Recuerda que podrás volver a ella usando la llave mágica de la parte superior
      </p>
    </div>
  );
}
