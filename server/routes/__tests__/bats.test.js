import request from 'supertest'
import { vi } from 'vitest'

import * as db from '../../db/functions/bats.js'
import server from '../../server.js'
import testBatDb from './testBatsDb.js'

vi.mock('../../db/functions/bats.js')

vi.spyOn(console, 'error').mockImplementation(() => {
  return
})

beforeEach(() => {
  vi.resetAllMocks()
})

describe('GET/api/v1/bats', () => {
  it('returns the bats', async () => {
    db.getBats.mockReturnValue(Promise.resolve(testBatDb))
    return await request(server)
      .get('/api/v1/bats')
      .then((res) => {
        expect(res.body).toHaveLength(5)
        expect(res.status).toEqual(200)
      })
  })
  it('returns the bats', async () => {
    db.getBats.mockImplementation(() =>
      Promise.reject(new Error('No bats for you'))
    )
    return await request(server)
      .get('/api/v1/bats')
      .then((res) => {
        expect(res.status).toEqual(500)
        expect(console.error).toHaveBeenCalled('No bats for you')
        expect(res.body.message).toEqual('Something went wrong')
      })
  })
})

describe('get /names', () => {
  test('returns bats names', () => {
    db.getBatsNames.mockReturnValue(
      Promise.resolve([{ id: 1, commonName: 'Long tail Bat' }])
    )
    return request(server)
      .get('/api/v1/bats/names')
      .then((res) => {
        expect(res.body).toHaveLength(1)
      })
  })

  test('returns an error message', () => {
    db.getBatsNames.mockImplementation(() => Promise.reject(new Error('Oops')))
    return request(server)
      .get('/api/v1/bats/names')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Oops')
      })
  })
})
