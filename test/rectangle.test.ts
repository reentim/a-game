import { Point } from './../lib/point'
import { Rectangle } from './../lib/rectangle'

describe(Rectangle, () => {
  const rect = new Rectangle(new Point(0, 0), new Point(10, 10))

  describe('#occupies', () => {
    it('is true when the other rectangle occupies the same space', () => {
      const other = new Rectangle(new Point(0, 0), new Point(10, 10))
      expect(rect.occupies(other)).toBe(true)
    })

    it('is true when the other rectangle intersects the rectangle', () => {
      const other = new Rectangle(new Point(9, 9), new Point(19, 19))
      expect(rect.occupies(other)).toBe(true)
    })

    it('is false when the other rectangle is outside the rectangle', () => {
      const other = new Rectangle(new Point(11, 11), new Point(19, 19))
      expect(rect.occupies(other)).toBe(false)
    })
  })
})
