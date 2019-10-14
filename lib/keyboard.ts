import { Game } from './game.js'

export class Keyboard {
  eventQueue: Array<KeyboardEvent>
  keysDown: Array<string>

  constructor(private game: Game) {
    this.eventQueue = new Array()
    this.keysDown = new Array()
    window.onkeydown = (event: KeyboardEvent) => this.buffer(event)
  }

  processEvents() {
    this.eventQueue.forEach(event => {
      switch (event.code) {
        case 'Space':
          this.game.togglePause()
          break
        case 'ArrowLeft':
          this.game.arrowLeft()
          break
        // case 'ArrowRight':
        // case 'ArrowUp':
        // case 'ArrowDown':
        default:
          console.log(event.code)
      }
    })
    this.eventQueue = []
  }

  buffer(event: KeyboardEvent) {
    this.eventQueue.push(event)
  }
}
