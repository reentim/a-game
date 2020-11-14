import { Box } from './box'
import { Canvas } from './canvas'
import { Cursor, Mouse } from './mouse'
import { Keyboard } from './keyboard'
import { Point } from './point'
import { Rectangle } from './rectangle'
import { SelectionBox } from './selectionBox'
import { World } from './world'
import { Order } from './order'

export class Game {
  canvas: Canvas
  keyboard: Keyboard
  lag: number
  mouse: Mouse
  selected: Array<Box>
  selectionBox?: SelectionBox
  time: number
  uiLayer: Canvas
  world: World
  pausedAt?: Date

  constructor() {
    this.canvas = new Canvas()
    this.keyboard = new Keyboard(this)
    this.lag = 0
    this.mouse = new Mouse(this)
    this.selected = new Array()
    this.time = this.now()
    this.uiLayer = new Canvas()
    this.world = new World()

    const box = new Box(
      new Point(this.canvas.width / 2, this.canvas.height / 2),
      100,
      100,
      'grey',
    )
    box.selectable = true
    this.world.create(box)

    const box2 = new Box(
      new Point(this.canvas.width / 2 - 100, this.canvas.height / 2 - 100),
      50,
      50,
      'grey',
    )
    box2.selectable = true
    this.world.create(box2)

    window.requestAnimationFrame(() => this.play())
  }

  arrowLeft() {
    if (this.selected.length > 0) {
      this.selected.forEach(thing =>
        thing.orders.push(new Order('thrust', new Point(0,0), { direction: 'left' })),
      )
    }
  }

  paused() {
    return this.pausedAt
  }

  togglePause() {
    if (this.paused()) {
      console.log('UN-PAUSE')
      this.pausedAt = undefined
    } else {
      console.log('PAUSE')
      this.pausedAt = new Date()
    }
  }

  makePointSelection(point: Point) {
    const thing = this.world.things.find(
      thing => thing.selectable && thing.occupiesPoint(point),
    )
    if (thing) {
      this.selected.forEach(thing => thing.deselect())

      thing.select()
      this.selected = [thing]
    } else {
      this.deselectAll()
    }
  }

  deselectAll() {
    this.selected.forEach(thing => thing.deselect())
    this.selected = []
  }

  makeSelection() {
    this.deselectAll()
    this.world.things
      .filter(
        thing =>
          thing.selectable &&
          this.selectionBox &&
          this.selectionBox.rect.occupies(thing.perimiter()),
      )
      .forEach(thing => {
        thing.select()
        this.selected.push(thing)
      })
    this.selectionBox = undefined
  }

  measureSelection(box: SelectionBox) {
    this.selectionBox = box
  }

  play() {
    const now = this.now()
    const dt = now - this.time
    const tick = 16
    this.time = now
    this.lag += dt

    this.processInput()

    while (this.lag >= tick) {
      if (!this.pausedAt) {
        this.world.update()
      }
      this.lag -= tick
    }

    this.render(this.lag / tick)
  }

  render(anticipation: number) {
    this.canvas.draw(anticipation, this.world.things)
    this.uiLayer.draw(anticipation, [this.mouse.cursor, this.selectionBox])
    window.requestAnimationFrame(() => this.play())
  }

  processInput() {
    this.mouse.processEvents()
    this.keyboard.processEvents()
  }

  handleMove(point: Point) {}

  handleRightClick(point: Point) {}

  now() {
    return window.performance.now()
  }
}
