
import { showBats } from '../actions/bats'
import reducer from '../reducers/bats'

describe('wombats reducer', () => {
  test('delete wombat action', () => {
    const state = []
    const action = showBats('batOne', 'batTwo', 'batThree')
    const newState = reducer(state, action)
    expect(newState).toContain('batOne', 'batTwo', 'batThree')
  })
  test('has initial state', () => {
    const state = reducer(undefined, { type: '@@TEST' })
    expect(state).toHaveLength(0)
  })
})

import { getBats } from '../../apiClient/bats'
import { fetchBats } from '../actions/bats'

vi.mock('../../apiClient/bats')

const mockBats = ['Toothy Bat', 'Snouty Bat']
getBats.mockReturnValue(Promise.resolve(mockBats))

const fakeDispatch = vitest.fn()
beforeEach(() => {
  vi.clearAllMocks()
})

describe('fetchBats', () => {
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











