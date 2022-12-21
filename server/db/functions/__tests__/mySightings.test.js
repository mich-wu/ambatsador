import knex from 'knex'

import config from '../../knexfile.js'
const testDb = knex(config.test)

import { getMySightings } from '../sightings.js'

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeEach(async () => {
  await testDb.seed.run()
})

afterAll(async () => {
  await testDb.destroy()
})

describe('getMySightings', () => {
  it('returns sightings from the database', () => {
    return getMySightings('auth0|123', testDb).then((sightings) => {
      expect(sightings).toHaveLength(2)
    })
  })

  it('returns sightings from the database', () => {
    return getMySightings('auth0|124', testDb).then((sightings) => {
      expect(sightings).toHaveLength(1)
    })
  })
})
