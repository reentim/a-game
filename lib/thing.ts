import { Vector } from './vector'
import { Box } from './box'
import { Order } from './order'
import { Line } from './line'
import { Point } from './point'
import { Rectangle } from './rectangle'

export class Thing {
  velocity: Vector
  subThings: Array<Box | Line>
  orders: Array<Order>
  selected: boolean
  mass: number
  destination: Point

  constructor(
    public position: Point,
    public width: number,
    public height: number,
    public selectable: boolean,
    public movable: boolean,
    public color: string,
  ) {
    this.color = color
    this.mass = 1
    this.movable = false
    this.orders = new Array()
    this.selectable = false
    this.selected = false
    this.subThings = new Array()
    this.velocity = new Vector(0, 0)
    this.destination = new Point(0, 0)
  }

  update() {
    this.orders.forEach(order => {
      if (order) {
        switch (order.name) {
          case 'move':
            if (order.point) this.moveTo(order.point)
            break
          case 'thrust':
            if (order.details && order.details.direction) {
              this.velocity = this.velocity.add(new Vector(0.1, Math.PI))
              break
            }
        }
      }
    })

    if (this.occupiesPoint(this.destination)) {
      this.stop()
    }

    this.orders = new Array()
    this.position.x += this.velocity.x()
    this.position.y += this.velocity.y()
  }

  stop() {
    this.subThings = new Array()

    this.velocity = new Vector(0, 0)
  }

  perimiter() {
    return new Rectangle(
      new Point(
        this.position.x - this.width / 2,
        this.position.y - this.height / 2,
      ),
      new Point(
        this.position.x + this.width / 2,
        this.position.y + this.height / 2,
      ),
    )
  }

  occupiesPoint(point: Point) {
    return this.perimiter().occupiesPoint(point)
  }

  select() {
    console.log('selecting')
    this.selected = true
    this.color = this.color.replace("0.75", "1")
  }

  deselect() {
    console.log('deselecting')
    this.selected = false
    this.color = this.color.replace("1)", "0.75)")
  }

  draw(anticipation: number, context: CanvasRenderingContext2D) {
    this.subThings.forEach(thing => thing.draw(anticipation, context))
    context.fillStyle = this.color
  }

  moveTo(point: Point) {
    const line = new Line(this.position, point, 'rgb(100,255,100)')
    const vector = new Vector(1, this.position.direction(point))

    this.destination = point

    this.subThings = new Array()

    this.subThings.push(line)
    this.subThings.push(new Box(point, 10, 10, 'rgb(50,255,50)'))

    this.velocity = vector
    console.log(this.velocity)
  }
}
