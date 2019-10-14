import { Point } from './../lib/point'

describe(Point, () => {
  const point = new Point(0, 0)

  // the screen's origin, top left, is south-east; north-west means bottom right

  describe('#direction', () => {
    it('is zero when the point is due west', () => {
      expect(point.direction(new Point(1, 0))).toBe(0)
    })

    it('is pi/2 radians when due north', () => {
      expect(point.direction(new Point(0, 1))).toBe(Math.PI / 2)
    })

    it('is pi radians when due east', () => {
      expect(point.direction(new Point(-1, 0))).toBe(Math.PI)
    })

    it('is 3*pi/2 radians when due south', () => {
      expect(point.direction(new Point(0, -1))).toBe((3 * Math.PI) / 2)
    })
  })
})
