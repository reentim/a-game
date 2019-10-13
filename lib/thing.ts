import { Vector } from './vector.js'
import { Box } from './box.js'
import { Order } from './order.js'
import { Line } from './line.js'
import { Point } from './point.js'

export class Thing {
  velocity: Vector
  subThings: Array<Box | Line>
  orders: Array<Order>

  constructor(
    public position: Point,
    public width: number,
    public height: number,
    public selectable: boolean,
    public movable: boolean,
    public color: string,
    private acceleration: Vector,
  ) {
    this.velocity = new Vector(0, 0)
    this.selectable = false
    this.movable = false
    this.color = color
    this.subThings = new Array()
    this.orders = new Array()
  }

  private maxAcceleration = 10

  update() {
    // this.subThings = this.subThings.filter((thing) => thing.color != 'red')
    const order = this.orders.pop()

    if (order) {
      switch (order.name) {
        case 'move':
          this.moveTo(order.details)
      }
    }

    this.position.x += this.velocity.x()
    this.position.y += this.velocity.y()
  }

  occupiesPoint(point: Point) {
    const isHit =
      point.x > this.position.x - this.width / 2 &&
      point.x < this.position.x + this.width / 2 &&
      point.y > this.position.y - this.height / 2 &&
      point.y < this.position.y + this.height / 2

    isHit && console.log('HIT')

    return isHit
  }

  select() {
    this.color = '#ccc'
  }

  deselect() {
    this.color = 'grey'
  }

  private bearing = (line: Line) => {
    const opposite = line.b.y - line.a.y
    const adjacent = line.b.x - line.a.x
    return Math.atan(opposite / adjacent)
  }

  draw(anticipation: number, context: CanvasRenderingContext2D) {
    context.fillStyle = this.color
    this.subThings.forEach(thing => thing.draw(anticipation, context))
  }

  moveTo(point: Point) {
    const line = new Line(this.position, point, 'white')

    // this.subThings.push(line)
    // this.subThings.push(
    //   new Line(
    //     this.position,
    //     new Point(
    //       this.position.x - this.velocity.x(),
    //       this.position.y - this.velocity.y(),
    //     ),
    //     'red',
    //   ),
    // )

    console.log('moveTo', point)
    // this.accelerateTo(new Vector(10, this.bearing(line)), 1)

    // if (!this.occupiesPoint(point)) {
    //   if (line.distance() < this.maxAcceleration) {
    //     this.accelerateTo(new Vector(10, this.bearing(line)), 1)
    //   } else {
    //     this.orders.push(new Order('move', point))
    //   }
    // }
  }

  accelerateTo(velocity: Vector, rate: number) {
    this.acceleration.direction = velocity.direction
    this.velocity.direction = velocity.direction
    if (this.velocity.magnitude < velocity.magnitude) {
      if (this.acceleration.magnitude < this.maxAcceleration) {
        this.acceleration.magnitude += rate * this.maxAcceleration
      }
      this.velocity.magnitude += this.acceleration.magnitude
      console.log('velocity', this.velocity)
    }
  }
}
