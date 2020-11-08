import { Point } from './point'
import { top, bottom, left, right } from './utils'

export class Rectangle {
  constructor(public a: Point, public b: Point) {}

  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.a.x, this.a.y, this.height(), this.width())
  }

  topLeft() {
    return new Point(left([this.a, this.b]).x, top([this.a, this.b]).y)
  }

  bottomLeft() {
    return new Point(left([this.a, this.b]).x, top([this.a, this.b]).y + this.height())
  }

  topRight() {
    return new Point(left([this.a, this.b]).x + this.width(), top([this.a, this.b]).y)
  }

  bottomRight() {
    return new Point(right([this.a, this.b]).x, bottom([this.a, this.b]).y)
  }

  shrink(amount: number) {
    const topLeft = this.topLeft()
    const bottomRight = this.bottomRight()

    return new Rectangle(
      new Point(topLeft.x + amount / 2, topLeft.y + amount / 2),
      new Point(bottomRight.x - amount / 2, bottomRight.y - amount / 2),
    )
  }

  width() {
    return this.b.x - this.a.x
  }

  height() {
    return this.b.y - this.a.y
  }

  toCanv() {
    return [this.a.x, this.a.y, this.width(), this.height()]
  }

  occupies(other: Rectangle) {
    const topLeft = this.topLeft()
    const bottomRight = this.bottomRight()
    const otherTopLeft = other.topLeft()
    const otherBottomRight = other.bottomRight()

    return (
      (bottomRight.x > otherTopLeft.x && bottomRight.y > otherTopLeft.y ) &&
      (topLeft.x < otherBottomRight.x && topLeft.y < otherBottomRight.y )
    )
  }

  occupiesPoint(maybeOccupied: Point) {
    const topLeft = this.topLeft()
    const bottomRight = this.bottomRight()

    return (
      topLeft.x < maybeOccupied.x &&
      bottomRight.x > maybeOccupied.x &&
      topLeft.y < maybeOccupied.y &&
      bottomRight.y > maybeOccupied.y
    )
  }
}
