import knex from 'knex'

import config from '../../knexfile.js'
import { addSighting, getSightingById, getSightings } from '../sightings'

const testDb = knex(config.test)

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())
afterAll(() => testDb.destroy())

const testSighting = {
  batId: 1,
  latitude: '',
  longitude: '',
  description: 'I saw one',
  date: '',
}

describe('add sighting', () => {
  it('adds a bat sighting', () => {
    return addSighting(testSighting, testDb).then((newIds) => {
      expect(newIds[0]).toBe(4)
    })
  })
})

describe('getSightings', () => {
  it('return sightings from db', () => {
    return getSightings(testDb).then((sightings) => {
      expect(sightings).toHaveLength(3)
    })
  })
})

describe('getSightingById', () => {
  it('return sightings from db', () => {
    return getSightingById(2, testDb).then((sighting) => {
      expect(sighting.id).toBe(2)
    })
  })
})
