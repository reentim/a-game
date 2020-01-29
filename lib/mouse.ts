import { Box } from './box'
import { Game } from './game'
import { Order } from './order'
import { Point } from './point'
import { SelectionBox } from './selectionBox'
import { eq } from './utils'

export class Mouse {
  cursor: Cursor
  eventQueue: Array<MouseEvent>
  game: Game
  leftDownAt?: Point
  leftUpAt?: Point
  rightDownAt?: Point
  rightUpAt?: Point

  constructor(game: Game) {
    this.cursor = new Cursor(new Point(0, 0))
    this.eventQueue = new Array()
    this.game = game
    this.bind()
  }

  bufferEvent(event: MouseEvent) {
    event.preventDefault()
    return this.eventQueue.push(event)
  }

  processEvents() {
    this.eventQueue.forEach((event: MouseEvent) => {
      const point = this.locationOf(event)

      switch (event.type) {
        case 'mousemove':
          this.move(point)
          break
        case 'mousedown':
          switch (event.button) {
            case 0:
              this.leftDown(point)
              break
            case 2:
              this.rightDown(point)
              break
          }
          break
        case 'mouseup':
          switch (event.button) {
            case 0:
              this.leftUp(point)
              break
            case 2:
              this.rightUp(point)
              break
          }
          break
      }
    })
    this.eventQueue = new Array()
  }

  bind() {
    window.onmousemove = (event: MouseEvent) => this.bufferEvent(event)
    window.onclick = (event: MouseEvent) => this.bufferEvent(event)
    window.oncontextmenu = (event: MouseEvent) => event.preventDefault()
    window.onmousedown = (event: MouseEvent) => this.bufferEvent(event)
    window.onmouseup = (event: MouseEvent) => this.bufferEvent(event)
  }

  move(point: Point) {
    if (this.leftDownAt) {
      this.game.measureSelection(new SelectionBox(this.leftDownAt, point))
    }
    this.updateCursor(point)
  }

  updateCursor(point: Point) {
    this.cursor.position = point
  }

  leftDown(point: Point) {
    this.leftUpAt = undefined
    this.leftDownAt = point
  }

  leftUp(point: Point) {
    this.game.makeSelection()
    if (this.leftDownAt && eq(this.leftDownAt, point)) {
      this.leftClick(point)
    }
    this.leftDownAt = undefined
    this.leftUpAt = point
  }

  rightDown(point: Point) {
    this.rightUpAt = undefined
    this.rightDownAt = point
  }

  rightUp(point: Point) {
    if (this.rightDownAt) {
      this.rightClick(point)
    }
    this.rightDownAt = undefined
    this.rightUpAt = point
  }

  leftClick(point: Point) {
    console.log('Mouse left click', point)
    this.updateCursor(point)

    this.game.makePointSelection(point)
  }

  rightClick(point: Point) {
    console.log('Mouse right click', point)
    this.updateCursor(point)

    if (this.game.selected.length > 0) {
      this.game.selected.forEach(thing => {
        // thing.orders.push(new Order('move', point))
        thing.orders = [new Order('move', point)]
      })
    }
  }

  locationOf(event: MouseEvent) {
    return this.screenToCanvas(new Point(event.clientX, event.clientY))
  }

  screenToCanvas(point: Point) {
    return new Point(point.x * 2, point.y * 2)
  }
}

export class Cursor {
  constructor(public position: Point) {}

  draw(anticipation: number, context: CanvasRenderingContext2D) {
    const region = new Path2D()
    region.moveTo(this.position.x, this.position.y)
    region.lineTo(this.position.x, this.position.y + 20)
    region.lineTo(this.position.x + 20, this.position.y)
    region.closePath()
    context.fillStyle = 'white'
    context.fill(region)
  }
}
