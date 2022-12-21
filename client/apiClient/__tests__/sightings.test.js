import nock from 'nock'

import { addSighting, getSighting, getSightings } from '../sightings'

describe('get all the sightings', () => {
  it('get sightings from the api', () => {
    const scope1 = nock('http://localhost')
      .get('/api/v1/sightings')
      .reply(200, {
        results: [
          { id: 1, name: 'bat1' },
          { id: 2, name: 'bat2' },
        ],
      })

    return getSightings().then((sightings) => {
      expect(sightings.results).toHaveLength(2)
      expect(sightings.results[0].name).toBe('bat1')
      expect(sightings.results[1].name).toBe('bat2')
      expect(scope1.isDone()).toBe(true)
    })
  })
})

describe('addSighting', () => {
  it('adds a bat sighting to the db', () => {
    const scope2 = nock('http://localhost')
      .post('/api/v1/sightings/add-sighting', {
        latitude: '123',
        longitude: '123',
      })
      .reply(201)

    return addSighting({ latitude: '123', longitude: '123' }).then(() => {
      expect(scope2.isDone()).toBe(true)
    })
  })
})

describe('get sighting by id', () => {
  it('get sighting from the api', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/sightings/1')
      .reply(200, {
        results: { id: 1, name: 'bat1' },
      })

    return getSighting(1).then((sighting) => {
      expect(sighting.results.name).toBe('bat1')
      expect(scope.isDone()).toBe(true)
    })
  })
})
