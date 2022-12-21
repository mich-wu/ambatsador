import nock from 'nock'

import { getMySightingsApi } from '../sightings'

describe('apiClient/sightings.js', () => {
  it('gets the sightings made by the user from the api', () => {
    const scope = nock('http://localhost', {
      reqheaders: {
        'accept-encoding': 'gzip, deflate',
        Authorization: 'Bearer token',
      },
    })
      .get('/api/v1/sightings/cave')
      .reply(200, {
        results: [
          {
            id: 1,
            batId: 2,
            userId: 'auth0|123',
            latitude: -36,
            longitude: 174,
            image: 'sighting1.png',
            description: 'wow a bat',
          },
          {
            id: 2,
            batId: 3,
            userId: 'auth0|123',
            latitude: -40,
            longitude: 180,
            image: 'sighting2.png',
            description: 'wow another bat',
          },
        ],
      })
    return getMySightingsApi('token').then((mySightings) => {
      expect(mySightings.results).toHaveLength(2)
      expect(scope.isDone()).toBe(true)
    })
  })
})
