import { vi } from 'vitest'

import { getMySightingsApi } from '../../apiClient/sightings'
import {
  FETCH_MY_SIGHTINGS_FAILURE,
  FETCH_MY_SIGHTINGS_REQUEST,
  FETCH_MY_SIGHTINGS_SUCCESS,
  fetchMySightings,
} from '../actions/sightings'

vi.mock('../../apiClient/sightings.js')

const mockBats = [
  { id: 1, batId: 1 },
  { id: 2, batId: 2 },
]
const token = 'fake-token'
const fakeDispatch = vi.fn()

describe('getMySightingsApi', () => {
  it('dispatches fetchMySightingsRequest simple action', () => {
    getMySightingsApi.mockReturnValue(Promise.resolve(mockBats))
    return fetchMySightings(token)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: FETCH_MY_SIGHTINGS_REQUEST,
      })
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: FETCH_MY_SIGHTINGS_SUCCESS,
        payload: mockBats,
      })
      return null
    })
  })
  it('dispatches fetchMySightingsFailure simple action when api function fails', () => {
    getMySightingsApi.mockImplementation(() =>
      Promise.reject({ message: 'oh no, no bats for you' })
    )
    return fetchMySightings(token)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: FETCH_MY_SIGHTINGS_REQUEST,
      })
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: FETCH_MY_SIGHTINGS_FAILURE,
        payload: { message: 'oh no, no bats for you' },
      })
      return null
    })
  })
})
