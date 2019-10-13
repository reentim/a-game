import { Rectangle } from './rectangle.js'
import { Point } from './point.js'

export class SelectionBox {
  box: Rectangle

  constructor(a: Point, b: Point) {
    this.box = new Rectangle(a, b, 'blue')
  }

  draw(anticipation: number, context: CanvasRenderingContext2D) {
    context.fillRect(
      this.box.a.x,
      this.box.a.y,
      this.box.width(),
      this.box.height(),
    )
  }
}
