export class Point {
  constructor(public x: number, public y: number, public z: number = 0) {}

  bearing(point: Point) {
    return new Triangle(this, point).theta()
  }

  distance(point: Point) {
    return new Triangle(this, point).hypotenuse()
  }
}
export class Triangle {
  constructor(public origin: Point, public opposite: Point) {}

  hypotenuse() {
    return Math.sqrt(this.rise() ** 2 + this.run() ** 2)
  }

  theta() {
    const acos = Math.acos(this.run() / this.hypotenuse())

    return this.rise() < 0 ? 2 * Math.PI - acos : acos
  }

  rise() {
    return this.opposite.y - this.origin.y
  }

  run() {
    return this.opposite.x - this.origin.x
  }
}
