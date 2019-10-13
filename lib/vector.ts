export class Vector {
  constructor(public magnitude: number, public direction: number) {}

  x() {
    return this.magnitude * Math.cos(Math.PI * this.direction)
  }

  y() {
    return this.magnitude * Math.sin(Math.PI * this.direction)
  }
}
