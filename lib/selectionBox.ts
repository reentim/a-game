import { Rectangle } from './rectangle'
import { Point } from './point'

export class SelectionBox {
  rect: Rectangle

  constructor(a: Point, b: Point) {
    this.rect = new Rectangle(a, b)
  }

  draw(anticipation: number, context: CanvasRenderingContext2D) {
    context.fillStyle = 'green'
    context.fillRect(...(this.rect.toCanv() as [number, number, number, number]))
    context.clearRect(
      ...(this.rect.shrink(4).toCanv() as [number, number, number, number]),
    )
  }
}
