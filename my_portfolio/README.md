# Orden lógico de desarrollo (Todo List)

1️⃣ Configuración Inicial

* Crear el proyecto con Next.js (npx create-next-app tu-portafolio).

* Configurar TailwindCSS para estilos (npm install -D tailwindcss postcss autoprefixer).

* Instalar Three.js y GSAP (npm install three gsap).

2️⃣ Estructura de Layout

* Crear el header con el menú de navegación (mantendrá la coherencia entre páginas).

* Implementar la lógica de navegación con Next.js (Link y useRouter).

3️⃣ Página de precarga

* Diseñar la animación de carga para mejorar la UX.

* Agregar el botón para entrar a la página principal.

4️⃣ Implementación del modelo 3D

* Importar los modelos de Blender y optimizar el rendimiento (GLTFLoader).

* Crear el efecto de seguimiento con el puntero (Raycaster en Three.js).

* Ajustar la iluminación y sombras.

5️⃣ Scroll y animaciones

* Sincronizar animaciones con el desplazamiento (GSAP ScrollTrigger).

* Diseñar la animación de caída del personaje hasta la siguiente sección.

* Establecer las transiciones fluidas entre secciones.

6️⃣ Interactividad de portales

* Programar el efecto de partículas con shaders o Three.js PointsMaterial.

* Agregar la lógica de interacción (onClick en Three.js para elegir un portal).

7️⃣ Implementación del movimiento del personaje

* En lugar de un vídeo estático, usar una animación .glb o .fbx del personaje caminando.

* Activar la animación en Three.js usando mixer.update(deltaTime).

* Sincronizar el movimiento del personaje con el scroll o la interacción.

8️⃣ Modo nocturno

* Implementar un context para almacenar el estado de tema (light / dark).

* Alternar materiales y efectos visuales para cada modo.

* Si decides usar vídeos, necesitarás dos versiones (día/noche) y cambiar dinámicamente el recurso.

9️⃣ Cambio de idioma

* Crear un contexto de idioma (LanguageContext).

* Almacenar traducciones en JSON y cambiar dinámicamente el contenido de la UI.

🔟 Página de contacto y despedida

* Implementar el formulario (useState + fetch para enviar datos).

* Agregar mensajes de confirmación y una animación de despedida.

## Blender

🔹 1. Rigging y unión de la armadura con la malla en Blender
Para animar correctamente tu personaje, necesitas unir los huesos de la armadura a la malla. Sigue estos pasos en Blender: 1️⃣ Selecciona la malla de tu personaje. 2️⃣ Agrega un Armature (esqueleto) si aún no lo tienes (Shift + A > Armature). 3️⃣ Coloca los huesos correctamente siguiendo la estructura del personaje. 4️⃣ Une la malla al Armature:

Selecciona primero la malla, luego el armature (Ctrl + Click).

Presiona Ctrl + P > Con armature deform > Con pesos automáticos.

Esto vinculará la malla a los huesos y permitirá que se deforme correctamente con la animación. 5️⃣ Ajusta los pesos en el modo Weight Paint si algunas zonas no se deforman correctamente.

No, no es obligatorio que la malla sea un solo objeto, puedes tener diferentes partes como las botas, guantes y ropa separadas. Lo importante es que cada una tenga su propio peso asignado a los huesos correctos para que se deformen adecuadamente con la animación.

Si las partes deben moverse con el personaje, asegúrate de parentarlas correctamente al Armature en Blender.

Usa Weight Paint para comprobar si cada elemento responde bien a los movimientos.

🔹 2. Crear y exportar animaciones desde Blender
Una vez que el rigging está listo, toca animarlo: 1️⃣ Ve al modo Pose Mode y crea las poses clave de la animación. 2️⃣ Usa el editor de Dope Sheet y Graph Editor para ajustar suavidad. 3️⃣ Exporta el modelo con la animación a formato .glb o .fbx:

Para .glb: Archivo > Exportar > GLTF 2.0 (.glb/.gltf).

Activa Animaciones en la configuración de exportación.

Guarda el archivo en tu carpeta public/models/.

Las animaciones que mencionas son clave para darle dinamismo al personaje. Te recomiendo las siguientes: 1️⃣ Caminata básica (Paso izquierdo y derecho que se repite en loop)

Sí, haz dos pasos completos (izquierdo y derecho) y usa AnimationMixer en Three.js para repetirlos cuando el usuario presione la tecla de avanzar. 2️⃣ Sentarse en el banco

Una animación de transición suave de pie a sentado. 3️⃣ Levantarse del asiento

La animación inversa a la de sentarse. 4️⃣ Caída

Importante que el personaje tenga física para simular una caída realista en Three.js..

🔹 ¿Cómo exportarlas? Sí, lo más óptimo es que exportes el modelo con todas las animaciones contenidas en un solo archivo .glb o .fbx, así Three.js podrá acceder a cada una fácilmente. En Three.js, usarás AnimationMixer para reproducir y sincronizar las animaciones:

js
const mixer = new THREE.AnimationMixer(model);
const caminar = mixer.clipAction(gltf.animations[0]); // Animación de caminar
const sentarse = mixer.clipAction(gltf.animations[1]); // Animación de sentarse

🔹 3. Renderizar el video de la cámara en Blender
Si necesitas sacar un video de lo que la cámara ve en Blender: 1️⃣ Selecciona la cámara en la escena y ajusta el path si es necesario. 2️⃣ Configura la salida en Render Properties:

Resolución (Ej: 1920x1080).

Formato de salida: .mp4 o .mov. 3️⃣ Ve a Output Properties, elige la carpeta de destino y activa el códec (FFmpeg video > MPEG-4). 4️⃣ Haz clic en Render > Render Animation y Blender generará el video.

Para simplificar la lógica, lo que planeas es perfecto. Aquí cómo podrías proceder:

✅ Página About Me

El personaje entra en escena y se sienta en un banco → Se activa una card con información y botón de retorno.

Usa un video de fondo (video en HTML) para esta escena y añade un overlay con la card encima.

✅ Página Proyectos

Personaje sentado en su despacho → Puedes hacer que algunos objetos sean clicables y abran cards descriptivas.

Alternativa: Un carrusel de cards para mostrar proyectos sin depender del entorno 3D.

✅ Página Contacto

El personaje llega a un punto específico → Un evento activa el formulario de contacto.

Si decides hacerlo con vídeo, puedes poner un video de fondo y encima un div con el formulario.

✅ Página Despedida

Animación de reverencia o saludo del personaje.

Otro vídeo con el personaje despidiéndose.

🔹 Consejo: Al usar vídeos, optimiza los archivos exportándolos con buena compresión (H.264 / MPEG-4) para que no ralenticen la web.

🔹 4. Integrar modelos y animaciones en Three.js
1️⃣ Carga el modelo en Three.js con GLTFLoader:

js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const loader = new GLTFLoader();
loader.load('/models/personaje.glb', (gltf) => {
    scene.add(gltf.scene);
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();
});
2️⃣ Vincular la animación con el scroll usando GSAP ScrollTrigger para activarlo en el momento adecuado. 3️⃣ Agregar efectos de partículas para los portales:

Usa PointsMaterial o ShaderMaterial para partículas interactivas al cruzar el portal.

🔹 5. Implementar el modo nocturno
Para alternar entre modo diurno y nocturno: 1️⃣ Usa un context en React para gestionar el tema (light/dark). 2️⃣ Si decides usar vídeos en los fondos, necesitarás dos versiones (día/noche) y cambiar dinámicamente el recurso al presionar el toggle. 3️⃣ En Three.js, usa cambio dinámico de luces y materiales cuando se active el modo nocturno:

js
if (modoNocturno) {
    scene.fog = new THREE.FogExp2(0x0a0a23, 0.002);
    scene.background = new THREE.Color(0x0a0a23);
} else {
    scene.fog = new THREE.FogExp2(0xfff3c2, 0.002);
    scene.background = new THREE.Color(0xfff3c2);
}

### three.js

🔹 1. Carga de modelos 3D (GLTFLoader)
Tus modelos en Blender deberán ser exportados en formato .glb o .fbx, luego los cargarás en Three.js así:

js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('/models/personaje.glb', (gltf) => {
    scene.add(gltf.scene); // Agregamos el modelo a la escena
});
✅ Optimización: Usa DRACO compression para reducir el tamaño de los archivos .glb y mejorar la carga.

🔹 2. Animaciones (AnimationMixer)
Como exportarás el personaje con todas sus animaciones, necesitarás activar la correcta según la interacción del usuario.

js
const mixer = new THREE.AnimationMixer(gltf.scene);
const caminar = mixer.clipAction(gltf.animations.find(clip => clip.name === 'Caminar'));
caminar.play(); // Inicia la animación
✅ Cambio de animación según teclas: Podrás hacer que, al presionar W, se active caminar, al presionar Space, que se siente, etc.

🔹 3. Iluminación y efectos (PointLight, SpotLight)
Para los efectos mágicos como los portales, necesitarás jugar con luces dinámicas y partículas:

js
const luzPortal = new THREE.PointLight(0x00ffcc, 2, 10);
luzPortal.position.set(0, 2, 0);
scene.add(luzPortal);
✅ Alternar luces en el modo nocturno cambiando dinámicamente el color y la intensidad.

🔹 4. Partículas (PointsMaterial) para los portales
Para el efecto de energía al cruzar el portal, puedes usar partículas con PointsMaterial:

js
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(1000 * 3); // Partículas
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.05 });
const portalEfecto = new THREE.Points(geometry, material);
scene.add(portalEfecto);
✅ Añadir movimiento a las partículas con shaders para un efecto más inmersivo.

🔹 5. Cámara y control de movimiento (OrbitControls, Raycaster)
Para que el personaje siga el puntero del mouse, usarás Raycaster:

js
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) *2 - 1;
    mouse.y = -(event.clientY / window.innerHeight)* 2 + 1;

    raycaster.setFromCamera(mouse, camera);
});
✅ Opcional: Si quieres que el personaje camine según la posición del cursor, puedes interpolar su movimiento hacia mouse.x, mouse.y.

🔹 6. Renderizado de fondo con vídeo
Para las páginas donde el character está en un entorno fijo, puedes usar un video de fondo y superponer elementos HTML:

#### Gsap

🔹 1. Carga de modelos 3D (GLTFLoader)
Tus modelos en Blender deberán ser exportados en formato .glb o .fbx, luego los cargarás en Three.js así:

js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('/models/personaje.glb', (gltf) => {
    scene.add(gltf.scene); // Agregamos el modelo a la escena
});
✅ Optimización: Usa DRACO compression para reducir el tamaño de los archivos .glb y mejorar la carga.

🔹 2. Animaciones (AnimationMixer)
Como exportarás el personaje con todas sus animaciones, necesitarás activar la correcta según la interacción del usuario.

js
const mixer = new THREE.AnimationMixer(gltf.scene);
const caminar = mixer.clipAction(gltf.animations.find(clip => clip.name === 'Caminar'));
caminar.play(); // Inicia la animación
✅ Cambio de animación según teclas: Podrás hacer que, al presionar W, se active caminar, al presionar Space, que se siente, etc.

🔹 3. Iluminación y efectos (PointLight, SpotLight)
Para los efectos mágicos como los portales, necesitarás jugar con luces dinámicas y partículas:

js
const luzPortal = new THREE.PointLight(0x00ffcc, 2, 10);
luzPortal.position.set(0, 2, 0);
scene.add(luzPortal);
✅ Alternar luces en el modo nocturno cambiando dinámicamente el color y la intensidad.

🔹 4. Partículas (PointsMaterial) para los portales
Para el efecto de energía al cruzar el portal, puedes usar partículas con PointsMaterial:

js
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(1000 * 3); // Partículas
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.05 });
const portalEfecto = new THREE.Points(geometry, material);
scene.add(portalEfecto);
✅ Añadir movimiento a las partículas con shaders para un efecto más inmersivo.

🔹 5. Cámara y control de movimiento (OrbitControls, Raycaster)
Para que el personaje siga el puntero del mouse, usarás Raycaster:

js
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) *2 - 1;
    mouse.y = -(event.clientY / window.innerHeight)* 2 + 1;

    raycaster.setFromCamera(mouse, camera);
});
✅ Opcional: Si quieres que el personaje camine según la posición del cursor, puedes interpolar su movimiento hacia mouse.x, mouse.y.

🔹 6. Renderizado de fondo con vídeo
Para las páginas donde el character está en un entorno fijo, puedes usar un video de fondo y superponer elementos HTML:

##### Otras consideraciones

🔹 1. Optimización de rendimiento
Dado que tu portafolio tendrá modelos 3D, animaciones y vídeos, es crucial que el rendimiento sea óptimo para evitar cargas lentas.

Usa next/image para imágenes en Next.js (carga optimizada y lazy loading).

Carga progresiva de modelos GLTF con useState y useEffect en React.

Uso de compresión DRACO para reducir el tamaño de modelos GLTF (KHR_draco_mesh_compression).

🔹 2. Control de estado global
Como manejarás cambios de idioma, modo nocturno y navegación, es recomendable tener un Context API o Zustand para gestionar estos estados: Ejemplo de gestión de modo nocturno:

js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [modoNocturno, setModoNocturno] = useState(false);
  return (
    <ThemeContext.Provider value={{ modoNocturno, setModoNocturno }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
✅ Así podrás cambiar dinámicamente entre modo día y noche en toda la aplicación.

🔹 3. Adaptabilidad y accesibilidad
Para que tu portafolio funcione bien en móviles y sea accesible, ten en cuenta:

Uso de media queries en Tailwind CSS para garantizar que las animaciones sean responsivas (sm:, md:, lg:).

Agrega navegación con teclado (tabIndex) para que sea inclusivo.

Optimiza la interacción táctil si en móviles el usuario no tiene cursor para mover el personaje.

🔹 4. Previsualización y fallback para cargas pesadas
Si una página tarda en cargar, puedes mostrar una animación de precarga con GSAP antes de que aparezca el contenido. Ejemplo de precarga con animación:

js
gsap.to('.loader', {
  opacity: 0,
  duration: 1,
  delay: 2,
  onComplete: () => document.querySelector('.loader').style.display = 'none'
});
✅ Evita que el usuario vea una pantalla en blanco mientras carga el contenido.

🔹 5. SEO y velocidad de carga
Aunque tu portafolio será visual e interactivo, no olvides optimizarlo para que se posicione bien en buscadores:

Usar next/head para meta-etiquetas (title, description).

Evitar sobrecarga de scripts y librerías para mejorar tiempos de carga.

Usar WebGL sin excesivo consumo de GPU para que Three.js no ralentice el navegador.
