export class Vector {
  constructor(public magnitude: number, public direction: number) {}

  x() {
    return this.magnitude * Math.sin(this.direction)
  }

  y() {
    return this.magnitude * Math.cos(this.direction)
  }
}
