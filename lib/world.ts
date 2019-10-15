import { Point } from './point'
import { Box } from './box'

export class World {
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
}
