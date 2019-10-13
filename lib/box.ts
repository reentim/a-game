import { Thing } from './thing.js'
import { Point } from './point.js'
import { Vector } from './vector.js'

export class Box extends Thing {
  constructor(
    public position: Point,
    public width: number,
    public height: number,
    public color: string,
  ) {
    super(position, width, height, true, true, color, new Vector(0, 0))
  }

  draw(anticipation: number, context: CanvasRenderingContext2D) {
    super.draw(anticipation, context)
    context.fillRect(
      this.position.x - this.width / 2 + anticipation * this.velocity.x(),
      this.position.y - this.height / 2 + anticipation * this.velocity.y(),
      this.height,
      this.width,
    )
  }
}
