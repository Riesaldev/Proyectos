import { BufferGeometry, Float32BufferAttribute,Points,PointsMaterial,Scene } from "three";

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
    const positions = new Float32Array(this.starQty * 3)//posicion de las estrellas
    for (let i = 0; i < this.starQty; i++) {
      positions[i * 3] = Math.random() * this.range - this.range / 2 //x posicion
      positions[i * 3 + 1] = Math.random() * this.range - this.range / 2 //y posicion
      positions[i * 3 + 2] = Math.random() * this.range - this.range / 2 //z posicion
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3)) //setea la geometria de las estrellas

    const material = new PointsMaterial({
      color: 0xcccccc,
      size: 1,
      transparent: true,
      opacity: 0.7,
      depthTest: true,
    })//crea el material de las estrellas

    this.starField = new Points(geometry, material)//crea las estrellas

    this.scene.add(this.starField) //agrega las estrellas a la escena
  }
}