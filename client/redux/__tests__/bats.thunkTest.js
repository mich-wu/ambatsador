// import request from 'supertest'
import { vi } from 'vitest'

import { fetchBats } from '../actions/bats'
// import { showBats } from '../actions/bats'

vi.mock('./api/v1/bats')

const mockBats = ['Toothy Bat', 'Snouty Bat']
fetchBats.mockReturnValue(Promise.resolve(mockBats))

const fakeDispatch = vitest.fn()
beforeEach(() => {
  vi.clearAllMocks()
})

describe('fetchFruit', () => {
  it('dispatches showBats simple action', () => {
    expect.assertions(1)
    const thunkFn = fetchBats()
    return thunkFn(fakeDispatch)
      .then(() => {
        // const fakeDispatchFirstCallFirstArgument = fakeDispatch.mock.calls[0][0]
        expect(fakeDispatch.mock.calls[0][0].type).toEqual('GET_BATS')
        return null
      })
  })
})