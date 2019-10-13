import { Rectangle } from './rectangle.js'
import { Point } from './point.js'

export class SelectionBox {
  rect: Rectangle

  constructor(a: Point, b: Point) {
    this.rect = new Rectangle(a, b)
  }

  draw(anticipation: number, context: CanvasRenderingContext2D) {
    context.fillStyle = 'white'
    context.fillRect(...(this.rect.toCanv() as [number, number, number, number]))
    context.clearRect(
      ...(this.rect.shrink(4).toCanv() as [number, number, number, number]),
    )
  }
}
