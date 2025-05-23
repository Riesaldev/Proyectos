
import {AmbientLight, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import Spaceship from "./spaceship";
import InputController from "./input.controller"
import { Starfield } from "./starfield";

export default class App {
  private readonly canvas = document.getElementById('canvas') as HTMLCanvasElement;
  private readonly scene = new Scene();
  private readonly renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
  private readonly perspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  private readonly inputController = new InputController();
  private readonly spaceship = new Spaceship(this.scene, this.inputController, 0.2);

  constructor() {
    this.config();
    this.createLight();
    this.animate();
    this.createInstances();
  }
  
  private createInstances(): void {
    this.spaceship.loadModel();
    new Starfield(this.scene);
  }

  private config(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.perspectiveCamera.position.set(0, 8, -10);
    this.perspectiveCamera.lookAt(0, 0, 0);
  }

  private animate(): void {
    this.renderer.render(this.scene, this.perspectiveCamera);
    this.spaceship.update();
    requestAnimationFrame(this.animate.bind(this));
  }

  private createLight(): void {
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 1);
    this.scene.add(directionalLight);
  }


}
