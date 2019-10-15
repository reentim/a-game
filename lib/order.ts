import { Point } from './point'

export class Order {
  constructor(
    public name: string,
    public point: Point,
    public details?: { direction: string },
  ) {}
}
