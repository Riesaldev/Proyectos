
import {AmbientLight, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import Spaceship from "./spaceship";
import InputController from "./input.controller"
import { Starfield } from "./starfield";
import { CameraController } from "./camera.controller";

export default class App {
  public static instance: App | null = null;
  private readonly canvas = document.getElementById('canvas') as HTMLCanvasElement;
  private readonly scene = new Scene();
  private readonly renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
  private readonly perspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  private readonly inputController = new InputController();
  private readonly spaceship = new Spaceship(this.scene, this.inputController, 0.2);
  private readonly cameraController = new CameraController(this.perspectiveCamera, this.spaceship);

  private constructor() {
    this.config();
    this.createLight();
    this.createInstances();
    this.animate();
    window.addEventListener('resize', this.onResize.bind(this));
    
  }

  public static start(): void {
    if (App.instance)       
      return;
    console.log('App started');
    App.instance = new App();
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
    this.cameraController.update();
  }

  private createLight(): void {
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 1);
    this.scene.add(directionalLight);
  }

  private onResize(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
    this.perspectiveCamera.updateProjectionMatrix();
  }

}
