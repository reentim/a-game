import { SelectionBox } from './selectionBox'
import { World } from './world'

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
  draw(anticipation: number, objects: Array<any>) {
    // TODO: drawable type
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    objects.forEach(obj => {
      if (obj) obj.draw(anticipation, this.context)
    })
  }

  resize() {
    this.width = window.innerWidth * window.devicePixelRatio
    this.height = window.innerHeight * window.devicePixelRatio
    this.canvas.width = this.width
    this.canvas.height = this.height
  }
}
