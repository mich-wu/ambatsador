import nock from 'nock'

import { getBats, getBatsNames } from '../bats.js'

describe('getBatsNames', () => {
  it('gets bat names from the db', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/bats/names')
      .reply(200, { commonName: 'Long-tailed bat' })

    return getBatsNames().then((bats) => {
      expect(bats.commonName).toBe('Long-tailed bat')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('getBats', () => {
  it('gets bats from api', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/bats')
      .reply(200, {
        result: [{ id: 1 }, { id: 2 }],
      })
    return getBats().then((bats) => {
      expect(bats.result).toHaveLength(2)
      expect(scope.isDone()).toBe(true)
    })
  })
})
