import { Point, Triangle } from './point'

export const NORTH: number = Math.PI / 2

export const SOUTH: number = (3 * Math.PI) / 2

export const EAST: number = Math.PI

export const WEST: number = 0

export class Vector {
  constructor(public amount: number, public direction: number) {}

  x() {
    return this.amount * Math.cos(this.direction)
  }

  y() {
    return this.amount * Math.sin(this.direction)
  }

  to() {
    return new Point(this.x(), this.y())
  }

  origin() {
    return new Point(0 - this.x(), 0 - this.y())
  }

  add(vector: Vector) {
    const triangle = new Triangle(this.origin(), vector.to())
    return new Vector(triangle.hypotenuse(), triangle.theta())
  }

  eq(vector: Vector) {
    return this.x() == vector.x() && this.y() == vector.y()
  }
}
