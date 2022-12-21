import { fetchSightings } from '../actions/sightings'
import reducer from '../reducers/sightings'

describe('Sightings reducer', () => {
  test('fetch sightings action', () => {
    const state = ['fred', 'sally', 'bill']
    const action = fetchSightings()
    const newState = reducer(state, action)
    expect(newState).toContain('sally')
  })
  test('has initial state', () => {
    const state = reducer(undefined, { type: '@@TEST' })
    expect(state).toHaveLength(0)
  })
})
