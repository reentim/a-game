import { Vector } from './vector.js'
import { Box } from './box.js'
import { Order } from './order.js'
import { Line } from './line.js'
import { Point } from './point.js'
import { Rectangle } from './rectangle.js'

export class Thing {
  velocity: Vector
  subThings: Array<Box | Line>
  orders: Array<Order>
  selected: boolean
  mass: number

  constructor(
    public position: Point,
    public width: number,
    public height: number,
    public selectable: boolean,
    public movable: boolean,
    public color: string,
    private acceleration: Vector,
  ) {
    this.color = color
    this.movable = false
    this.orders = new Array()
    this.selectable = false
    this.selected = false
    this.subThings = new Array()
    this.velocity = new Vector(0, 0)
    this.mass = 1
  }

  private maxAcceleration = 10

  update() {
    this.orders.forEach(order => {
      if (order) {
        switch (order.name) {
          case 'move':
            this.moveTo(order.details)
        }
      }
    })
    this.orders = new Array()
    this.position.x += this.velocity.x()
    this.position.y += this.velocity.y()
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
    this.color = '#ccc'
  }

  deselect() {
    console.log('deselecting')
    this.selected = false
    this.color = 'grey'
  }

  private bearing = (point: Point) => {
    // TODO: learn maths
    if (point.x > this.position.x && point.y > this.position.y) {
      let opposite = point.x - this.position.x
      let adjacent = point.y - this.position.y
      return Math.atan(opposite / adjacent)
    } else if (point.x > this.position.x && point.y < this.position.y) {
      let opposite = point.y - this.position.y
      let adjacent = this.position.x - point.x
      return Math.atan(opposite / adjacent) + Math.PI / 2
    } else if (point.x < this.position.x && point.y < this.position.y) {
      let opposite = point.y - this.position.y
      let adjacent = point.x - this.position.x
      return 1.5 * Math.PI - Math.atan(opposite / adjacent)
    } else {
      let opposite = point.x - this.position.x
      let adjacent = point.y - this.position.y
      return Math.PI / 2 + Math.atan(opposite / adjacent) + 1.5 * Math.PI
    }
  }

  private degreeBearing = (point: Point) => {
    return this.bearing(point) * 180 - 90
  }

  draw(anticipation: number, context: CanvasRenderingContext2D) {
    this.subThings.forEach(thing => thing.draw(anticipation, context))
    context.fillStyle = this.color
  }

  moveTo(point: Point) {
    const line = new Line(this.position, point, 'white')
    this.subThings = [line, new Box(point, 10, 10, 'grey')]

    console.log(this.bearing(point))

    this.velocity = new Vector(1, this.bearing(point))
    console.log('velocity direction', this.velocity.direction)
    console.log('velocity details', this.velocity.x(), this.velocity.y())

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
