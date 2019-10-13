import { Game } from './game.js'

export class Keyboard {
  eventQueue: Array<KeyboardEvent>
  keysDown: Array<string>

  constructor(private game: Game) {
    this.eventQueue = new Array()
    this.keysDown = new Array()
    window.onkeypress = (event: KeyboardEvent) => this.buffer(event)
  }

  processEvents() {
    this.eventQueue.forEach(event => {
      if (event.code == 'Space') {
        this.game.togglePause()
      }
    })
    this.eventQueue = []
  }

  buffer(event: KeyboardEvent) {
    this.eventQueue.push(event)
  }
}
