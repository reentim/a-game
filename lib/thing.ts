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
  maxAcceleration: number

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
    this.mass = 1
    this.maxAcceleration = 10
    this.movable = false
    this.orders = new Array()
    this.selectable = false
    this.selected = false
    this.subThings = new Array()
    this.velocity = new Vector(0, 0)
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

  draw(anticipation: number, context: CanvasRenderingContext2D) {
    this.subThings.forEach(thing => thing.draw(anticipation, context))
    context.fillStyle = this.color
  }

  moveTo(point: Point) {
    const line = new Line(this.position, point, 'white')
    const vector = new Vector(5, this.position.direction(point))

    this.subThings.push(line)
    this.subThings.push(new Box(point, 10, 10, 'grey'))

    console.log(this.velocity)
    this.velocity = this.velocity.add(vector)
    console.log(this.velocity)

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

    // this.accelerateTo(new Vector(10, this.direction(line)), 1)

    // if (!this.occupiesPoint(point)) {
    //   if (line.distance() < this.maxAcceleration) {
    //     this.accelerateTo(new Vector(10, this.direction(line)), 1)
    //   } else {
    //     this.orders.push(new Order('move', point))
    //   }
    // }
  }

  accelerateTo(velocity: Vector, rate: number) {
    this.acceleration.direction = velocity.direction
    this.velocity.direction = velocity.direction
    if (this.velocity.amount < velocity.amount) {
      if (this.acceleration.amount < this.maxAcceleration) {
        this.acceleration.amount += rate * this.maxAcceleration
      }
      this.velocity.amount += this.acceleration.amount
      console.log('velocity', this.velocity)
    }
  }
}
