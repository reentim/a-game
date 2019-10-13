import { Point } from './point.js'
import { Rectangle } from './rectangle.js'

export const eq = (a: Point, b: Point) => a.x == b.x && a.y == b.y

export const shrink = (rect: Rectangle) => {
}

export const findPoint = (points: Array<Point>, cb: Function) => {
  let foundPoint: Point = points[0]
  points.forEach(point => {
    if (cb(foundPoint, point)) {
      foundPoint = point
    }
  })
  return foundPoint
}

export const top = (points: Array<Point>) =>
  findPoint(points, (a: Point, b: Point) => b.y < a.y)
export const right = (points: Array<Point>) =>
  findPoint(points, (a: Point, b: Point) => b.x > a.x)
export const bottom = (points: Array<Point>) =>
  findPoint(points, (a: Point, b: Point) => b.y > a.y)
export const left = (points: Array<Point>) =>
  findPoint(points, (a: Point, b: Point) => b.x < a.x)
