import { Thing } from './thing'
import { Point } from './point'
import { Vector } from './vector'

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
      ...(super.perimiter().toCanv() as [number, number, number, number]),
    )
  }

  select() {
    super.select()
  }
}
