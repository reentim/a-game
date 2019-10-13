import { SelectionBox } from './selectionBox.js'
import { World } from './world.js'

export class Canvas {
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
    window.onresize = () => this.resize()
  }

  // the save, move, reset method is more performant, maybe
  draw(anticipation: number, world: World, selectionBox?: SelectionBox) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    world.things.forEach(thing => thing.draw(anticipation, this.context))
    if (selectionBox) {
      selectionBox.draw(anticipation, this.context)
    }
  }

  resize() {
    this.width = window.innerWidth * window.devicePixelRatio
    this.height = window.innerHeight * window.devicePixelRatio
    this.canvas.width = this.width
    this.canvas.height = this.height
  }
}
