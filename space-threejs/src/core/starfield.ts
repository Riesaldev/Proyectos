import { BufferGeometry, Float32BufferAttribute,Points,PointsMaterial,Scene, TextureLoader } from "three";

export class Starfield {
  private declare starField: Points;
  private declare scene: Scene;

  constructor(scene: Scene,
    private readonly starQty: number= 20000,
    private readonly range: number= 1000,
  ){
    this.scene = scene;
    this.createStarField()//crea el campo de estrellas
  }

    private createStarField(): void {
    const positions = new Float32Array(this.starQty * 3);
    for (let i = 0; i < this.starQty; i++) {
      positions[i * 3] = Math.random() * this.range - this.range / 2;
      positions[i * 3 + 1] = Math.random() * this.range - this.range / 2;
      positions[i * 3 + 2] = Math.random() * this.range - this.range / 2;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));

    const texture = new TextureLoader().load("/public/circulo.png");

    const coreMaterial = new PointsMaterial({
      color: 0xfff1a2,
      size: 1,
      transparent: true,
      opacity: 0.6,
      depthTest: true,
      map: texture,
    });

    const haloMaterial = new PointsMaterial({
      color: 0xffa8a2,
      size: 2,
      transparent: true,
      opacity: 0.2,
      depthTest: false,
      map: texture,
      alphaTest: 0.2,
    });

    const coreStars = new Points(geometry, coreMaterial); // núcleo
    const haloStars = new Points(geometry, haloMaterial); // halo

    this.scene.add(haloStars); // primero el halo
    this.scene.add(coreStars); // luego el núcleo

  }
}