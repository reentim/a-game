import { Point }  from './point.js'

export class Rectangle {
  constructor(public a: Point, public b: Point, public color: string) {}

  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.a.x, this.a.y, this.height(), this.width())
  }

  width() {
    return this.b.x - this.a.x
  }

  height() {
    return this.b.y - this.a.y
  }
}
