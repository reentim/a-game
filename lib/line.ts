import { Point } from './point.js'

export class Line {
  constructor(public a: Point, public b: Point, public color: string) {}

  draw(anticipation: number, context: CanvasRenderingContext2D) {
    context.strokeStyle = this.color
    context.beginPath()
    context.moveTo(this.a.x, this.a.y)
    context.lineTo(this.b.x, this.b.y)
    context.stroke()
  }

  distance() {
    const a = this.b.x - this.a.x
    const b = this.b.y - this.a.y
    return Math.sqrt(a ** 2 + b ** 2)
  }
}
