import { Point, Triangle } from './point.js'

export class Vector {
  constructor(public magnitude: number, public direction: number) {}

  x() {
    return this.magnitude * Math.cos(this.direction)
  }

  y() {
    return this.magnitude * Math.sin(this.direction)
  }

  to() {
    return new Point(this.x(), this.y())
  }

  add(vector: Vector) {
    const triangle = new Triangle(new Point(0, 0), vector.to())
    console.log(triangle)
    return new Vector(triangle.hypotenuse(), triangle.theta())
  }
}
