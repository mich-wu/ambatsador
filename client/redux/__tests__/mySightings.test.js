import {
  FETCH_MY_SIGHTINGS_FAILURE,
  FETCH_MY_SIGHTINGS_REQUEST,
  fetchMySightingsSuccess,
} from '../actions/sightings'
import mySightingsReducer from '../reducers/mySightings'

describe('/reducers/mySightings', () => {
  const mockState = {
    data: null,
    error: null,
    loading: false,
  }
  it('has initial state ', () => {
    const state = mySightingsReducer(undefined, { type: '@@TEST' })
    expect(state).toEqual(mockState)
  })
  it('sets loading state with FETCH_MY_SIGHTINGS_REQUEST', () => {
    const newState = mySightingsReducer(mockState, {
      type: FETCH_MY_SIGHTINGS_REQUEST,
    })
    expect(newState.loading).toBe(true)
  })
  it('sets the state with FETCH_MY_SIGHTINGS_SUCCESS', () => {
    const batData = [
      { id: 1, bat: 1 },
      { id: 2, bat: 2 },
    ]
    const newState = mySightingsReducer(
      mockState,
      fetchMySightingsSuccess(batData)
    )
    expect(newState.loading).toBe(false)
    expect(newState.data).toEqual(batData)
  })
  it('sets an error state with FETCH_MY_SIGHTINGS_FAILURE', () => {
    const newState = mySightingsReducer(mockState, {
      type: FETCH_MY_SIGHTINGS_FAILURE,
      payload: 'error',
    })
    expect(newState.loading).toBe(false)
    expect(newState.error).toBe('error')
  })
})
