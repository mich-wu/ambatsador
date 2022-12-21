import knex from 'knex'

import config from '../../knexfile.js'
import { getBats, getBatsNames } from '../bats.js'
const testDb = knex(config.test)

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())
afterAll(() => testDb.destroy())

describe('getBatsNames', () => {
  it('gets bat names for dropdown', () => {
    return getBatsNames(testDb).then((bats) => {
      expect(bats).toHaveLength(3)
      expect(bats[0].commonName).toContain('Long-tailed bat')
    })
  })
})

describe('getBats', () => {
  test('gets the bats from db', () => {
    return getBats(testDb).then((bats) => {
      expect(bats).toHaveLength(3)
    })
  })
  test(`show bat name`, () => {
    return getBats(testDb).then((bats) => {
      expect(bats[0].commonName).toBe('Long-tailed bat')
    })
  })
  test(`show bat 2nd image`, () => {
    return getBats(testDb).then((bats) => {
      expect(bats[1].image).toBe('greater-short-tailed.jpg')
    })
  })
})
