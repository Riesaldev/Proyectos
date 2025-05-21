
//Importamos los estilos  y las librerías de Three.js
import './style.css'
// Importamos la clase WebGLRenderer para renderizar la escena
import {AmbientLight, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer} from "three";
// Importamos la clase GLTFLoader para cargar modelos GLTF
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
// Importamos la clase GLTF para manejar los modelos GLTF
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
////


class App {
  //Configuramos la escena, la cámara y el renderizador
  canvas = document.getElementById('canvas') as HTMLCanvasElement;
  scene = new Scene();
  renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
  ////
  //Configuramos la cámara
  perspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  ////
  constructor() {
    
    this.config();
    this.createLight();
    this.loadModel();
    this.animate();
  }
  

  config() {
    //Establecemos el aspecto de la cámara
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //posicionamos la cámara
    this.perspectiveCamera.position.set(0, 8, -10);
    //Orientamos la cámara
    this.perspectiveCamera.lookAt(0, 0, 0);
    ////
  }
  
  animate() {
    //Asociamos la cámara y la escena al renderizador
    //Esto renderiza la escena desde la perspectiva de la cámara
    //El método render() toma dos argumentos: la escena y la cámara
    //El renderizador dibuja la escena en el canvas
    this.renderer.render(this.scene, this.perspectiveCamera);
    //Llamamos a la función animate de nuevo en el siguiente frame
    //Esto crea un bucle de animación
    //requestAnimationFrame es una función que se utiliza para crear animaciones en el navegador
    requestAnimationFrame(this.animate.bind(this));
    //El método bind() se utiliza para establecer el valor de this dentro de la función animate
  
    //console.log para verificar que el bucle de animación se está ejecutando
    //Esto se ejecuta en cada frame de la animación
    //Esto es útil para depurar y verificar que la animación se está ejecutando correctamente
    //console.log('Hola desde el bucle de animación');
    
  }

  createLight() {
    //Añadimos la iluminación a la escena
    const ambientLight = new AmbientLight(0xffffff, 0.5);  // luz blanca
    // Añadimos la luz a la escena
    this.scene.add(ambientLight);
    ////
    
    // Añadimos una luz direccional a la escena
    const directionalLight = new DirectionalLight(0xffffff, 1); // luz blanca
    // Añadimos la luz direccional a la escena
    this.scene.add(directionalLight);
  }

  loadModel() {
    //instanciamos GLTFLoader
    //GLTFLoader es una clase que se utiliza para cargar modelos GLTF
    const loader = new GLTFLoader();
    //Cargamos el modelo GLTF
    loader.load('/spaceship.glb', (gltf: GLTF) => {
      //Añadimos el modelo a la escena
      const model = gltf.scene;
      //Escalamos el modelo
      model.scale.set(0.2, 0.2, 0.2);
      //añadimos el modelo a la escena
      this.scene.add(model);
    });
}
}

new App();