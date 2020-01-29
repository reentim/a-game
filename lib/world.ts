import { Point } from './point'
import { Box } from './box'

export class World {
  things: Array<Box>

  constructor() {
    this.things = new Array()
  }

  update(lag: number) {
    this.things.forEach(thing => thing.update(lag))
  }

  create(thing: any) {
    this.things.push(thing)
  }
}
