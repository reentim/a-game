import { Vector, NORTH, SOUTH, EAST, WEST } from './../lib/vector'

describe(Vector, () => {
  describe('1 meter due north', () => {
    describe('#x', () => {
      it('is 0', () => {
        expect(new Vector(1, NORTH).x()).toBeCloseTo(0)
      })
    })

    describe('#y', () => {
      it('is 1', () => expect(new Vector(1, NORTH).y()).toBeCloseTo(1))
    })
  })

  describe('-1 meter due north', () => {
    describe('#x', () => {
      it('is 0', () => {
        expect(new Vector(-1, NORTH).x()).toBeCloseTo(0)
      })
    })

    describe('#y', () => {
      it('is -1', () => {
        expect(new Vector(-1, NORTH).y()).toBeCloseTo(-1)
      })
    })
  })

  describe('2 meters due east', () => {
    describe('#x', () => {
      it('is -2', () => expect(new Vector(2, EAST).x()).toBeCloseTo(-2))
    })

    describe('#y', () => {
      it('is 0', () => expect(new Vector(2, EAST).y()).toBeCloseTo(0))
    })
  })

  describe('4 meters due south', () => {
    describe('#x', () => {
      it('is 0', () => {
        expect(new Vector(4, SOUTH).x()).toBeCloseTo(0)
      })
    })

    describe('#y', () => {
      it('is -4', () => expect(new Vector(4, SOUTH).y()).toBeCloseTo(-4))
    })
  })

  describe('8 meters due west', () => {
    describe('#x', () => {
      it('is 8', () => expect(new Vector(8, WEST).x()).toBeCloseTo(8))
    })

    describe('#y', () => {
      it('is 0', () => expect(new Vector(8, WEST).y()).toBeCloseTo(0))
    })
  })

  describe('#add', () => {
    const north = new Vector(1, NORTH)
    const west = new Vector(1, WEST)

    it('with zero vector, replaces', () => {
      const newVector = new Vector(0, NORTH).add(north)

      expect(newVector.eq(north)).toBe(true)
    })

    it('adds to a vector with amount', () => {
      const result = north.add(west)
      const expected = new Vector(Math.sqrt(2), Math.PI / 4)

      expect(result.x()).toBeCloseTo(1)
      expect(result.y()).toBeCloseTo(1)
    })
  })
})
