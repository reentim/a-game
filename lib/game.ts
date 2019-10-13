import { Point } from './point.js'
import { Canvas } from './canvas.js'
import { World } from './world.js'
import { Box } from './box.js'
import { Mouse } from './mouse.js'
import { Keyboard } from './keyboard.js'
import { SelectionBox } from './selectionBox.js'
import { Rectangle } from './rectangle.js'

export class Game {
  time: number
  lag: number
  canvas: Canvas
  world: World
  selected: Array<Box>
  mouse: Mouse
  keyboard: Keyboard
  selectionBox?: SelectionBox

  constructor() {
    this.time = this.now()
    this.lag = 0
    this.canvas = new Canvas()
    this.world = new World()
    this.selected = new Array()
    this.mouse = new Mouse(this)
    this.keyboard = new Keyboard()

    this.world.create(
      new Box(
        new Point(this.canvas.width / 2, this.canvas.height / 2),
        100,
        100,
        'grey',
      ),
    )

    window.requestAnimationFrame(() => this.play())
  }

  makeSelection() {
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
      this.world.update()
      this.lag -= tick
    }

    this.render(this.lag / tick)
  }

  render(anticipation: number) {
    this.canvas.draw(anticipation, this.world, this.selectionBox)
    window.requestAnimationFrame(() => this.play())
  }

  processInput() {
    this.mouse.processEvents()
  }

  handleMove(point: Point) {}

  handleRightClick(point: Point) {}

  now() {
    return window.performance.now()
  }
}
