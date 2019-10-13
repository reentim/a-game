// TODO
// keyword arguments would be nice
// interfaces
// default arguments for constructors

// what about, since I'm so into space, a space game? would also suit lowbit
// graphics
// could be lander & shooter
// with bearing -- like Pirates!
// full fucking Homeworld
//
// takes on other games, Stronghold with more economics

class Thing {
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

class Order {
  constructor(public name: string, public details: Point) {}
}

class Line {
  constructor(public a: Point, public b: Point, public color: string) {}

  draw(anticipation: number, context: CanvasRenderingContext2D) {
    context.strokeStyle = this.color
    context.beginPath()
    context.moveTo(this.a.x, this.a.y)
    context.lineTo(this.b.x, this.b.y)
    context.stroke()
  }

  distance() {
    const a = this.b.x - this.a.x
    const b = this.b.y - this.a.y
    return Math.sqrt(a ** 2 + b ** 2)
  }
}

class World {
  things: Array<Box>

  constructor() {
    this.things = new Array()
  }

  update() {
    this.things.forEach(thing => thing.update())
  }

  create(thing: any) {
    this.things.push(thing)
  }

  findThingAt(point: Point) {
    return this.things.find(thing => thing.occupiesPoint(point))
  }
}

class Point {
  constructor(public x: number, public y: number) {}
}

class Vector {
  constructor(public magnitude: number, public direction: number) {}

  x() {
    return this.magnitude * Math.cos(Math.PI * this.direction)
  }

  y() {
    return this.magnitude * Math.sin(Math.PI * this.direction)
  }
}

class Box extends Thing {
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

class Canvas {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  width: number
  height: number

  constructor() {
    const body = document.getElementsByTagName('body')[0]
    this.canvas = document.createElement('canvas')
    this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d')
    this.width = 0
    this.height = 0
    this.resize()
    body.appendChild(this.canvas)
  }

  // the save, move, reset method is more performant, maybe
  draw(world: World, anticipation: number) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    world.things.forEach(thing => thing.draw(anticipation, this.context))
  }

  resize() {
    this.width = window.innerWidth * window.devicePixelRatio
    this.height = window.innerHeight * window.devicePixelRatio
    this.canvas.width = this.width
    this.canvas.height = this.height
  }
}

class Rectangle {
  constructor(public a: Point, public b: Point, public color: string) {}

  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.a.x, this.a.y, this.height(), this.width())
  }

  width() {
    return this.b.x - this.a.x
  }

  height() {
    return this.b.y - this.a.y
  }
}

class Game {
  time: number
  lag: number
  canvas: Canvas
  inputQueue: Array<MouseEvent>
  world: World
  selection: Array<Box>
  mouse: Mouse
  keyboard: Keyboard
  selectionBox: Rectangle

  constructor() {
    this.time = this.now()
    this.lag = 0
    this.canvas = new Canvas()
    this.inputQueue = new Array()
    this.world = new World()
    this.selection = new Array()
    this.mouse = new Mouse(new Point(0, 0))
    this.keyboard = new Keyboard()
    this.selectionBox = new Rectangle(new Point(0, 0), new Point(0, 0), 'blue')

    this.world.create(
      new Box(
        new Point(this.canvas.width / 2, this.canvas.height / 2),
        100,
        100,
        'grey',
      ),
    )

    this.bindInput()

    window.requestAnimationFrame(() => this.play())
  }

  bindInput() {
    window.onresize = () => this.canvas.resize()
    window.onmousemove = (event: MouseEvent) => this.bufferInput(event)
    window.onclick = (event: MouseEvent) => this.bufferInput(event)
    window.oncontextmenu = (event: MouseEvent) => this.bufferInput(event)
    window.onmousedown = (event: MouseEvent) => this.bufferInput(event)
    window.onmouseup = (event: MouseEvent) => this.bufferInput(event)
  }

  play() {
    const now = this.now()
    const dt = now - this.time
    const tick = 16

    this.time = now
    this.lag += dt

    this.processInput()

    while (this.lag >= tick) {
      this.world.update()
      this.lag -= tick
    }

    this.render(this.lag / tick)
  }

  render(anticipation: number) {
    this.canvas.draw(this.world, anticipation)
    window.requestAnimationFrame(() => this.play())
  }

  bufferInput(event: MouseEvent) {
    event.preventDefault()
    return this.inputQueue.push(event)
  }

  processInput() {
    this.inputQueue.forEach((event: MouseEvent) => {
      switch (event.type) {
        case 'mousemove':
          this.handleMove(event)
          break
        case 'click':
          this.handleClick(event)
          break
        case 'contextmenu':
          this.handleRightClick(event)
          break
        case 'mousedown':
          this.handleMouseDown(event)
          break
        case 'mouseup':
          this.handleMouseUp(event)
          break
      }
    })
    this.inputQueue = new Array()
  }

  screenToCanvas(point: Point) {
    return new Point(point.x * 2, point.y * 2)
  }

  handleMove(event: MouseEvent) {
    const point = this.screenToCanvas(new Point(event.clientX, event.clientY))
  }

  handleRightClick(event: MouseEvent) {
    const point = this.screenToCanvas(new Point(event.clientX, event.clientY))

    if (this.selection.length > 0) {
      this.world.create(new Box(point, 10, 10, 'grey'))
      this.selection.forEach(thing => {
        thing.orders.push(new Order('move', point))
      })
    }
  }

  handleClick(event: MouseEvent) {
    const point = this.screenToCanvas(new Point(event.clientX, event.clientY))
    const thing = this.world.findThingAt(point)

    console.log('click', point)

    if (thing) {
      this.selection = [thing]
      thing.select()
    } else {
      this.selection.forEach(thing => thing.deselect())
      this.selection = []
    }
  }

  handleMouseDown(event: MouseEvent) {
    const point = this.screenToCanvas(new Point(event.clientX, event.clientY))

    this.mouse.down(point)

    this.selectionBox = new Rectangle(point, point, 'blue')
    this.world.create(this.selectionBox)
  }

  handleMouseUp(event: MouseEvent) {
    const point = this.screenToCanvas(new Point(event.clientX, event.clientY))

    this.mouse.up(point)
    this.selectionBox = new Rectangle(this.selectionBox.a, point, 'blue')
    this.world.create(this.selectionBox)
  }

  now() {
    return window.performance.now()
  }
}

class Mouse {
  isUp: boolean
  cursor: Point

  constructor(cursor: Point) {
    this.isUp = true
    this.cursor = cursor
  }

  updateCursor(point: Point) {
    this.cursor = point
  }

  isDown() {
    return !this.up
  }

  down(point: Point) {
    console.log('Mouse down')
    this.isUp = false
    this.updateCursor(point)
  }

  up(point: Point) {
    console.log('Mouse up')
    this.isUp = true
    this.updateCursor(point)
  }
}

class Keyboard {}

new Game()
