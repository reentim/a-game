import { Box } from './box.js'
import { Game } from './game.js'
import { Order } from './order.js'
import { Point } from './point.js'
import { SelectionBox } from './selectionBox.js'
import { eq } from './utils.js'

export class Mouse {
  cursor: Point
  eventQueue: Array<MouseEvent>
  game: Game
  leftDownAt?: Point
  rightDownAt?: Point
  leftUpAt?: Point
  rightUpAt?: Point

  constructor(game: Game) {
    this.cursor = new Point(0, 0)
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

      this.report()
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
    this.cursor = point
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
    this.rightDownAt = undefined
    this.rightUpAt = point
  }

  report() {
    if (this.leftDownAt && this.rightDownAt) {
      console.log('|x|x|')
    } else if (this.leftDownAt) {
      console.log('|x| |')
    } else if (this.rightDownAt) {
      console.log('| |x|')
    } else {
      console.log('| | |')
    }
  }

  leftClick(point: Point) {
    console.log('Mouse left click', point)
    this.updateCursor(point)

    const thing = this.game.world.findThingAt(point)

    if (thing) {
      this.game.selected = [thing]
      thing.select()
    } else {
      this.game.selected.forEach(thing => thing.deselect())
      this.game.selected = []
    }
  }

  rightClick(point: Point) {
    console.log('Mouse right click', point)
    this.updateCursor(point)

    if (this.game.selected.length > 0) {
      this.game.world.create(new Box(point, 10, 10, 'grey'))
      this.game.selected.forEach(thing => {
        thing.orders.push(new Order('move', point))
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
