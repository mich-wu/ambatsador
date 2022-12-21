import { getMySightingsApi } from '../../apiClient/sightings'
import { getSightings } from '../../apiClient/sightings'
export const SET_SIGHTINGS = 'SET_SIGHTINGS'

export const FETCH_MY_SIGHTINGS_REQUEST = 'FETCH_MY_SIGHTINGS_REQUEST'
export const FETCH_MY_SIGHTINGS_SUCCESS = 'FETCH_MY_SIGHTINGS_SUCCESS'
export const FETCH_MY_SIGHTINGS_FAILURE = 'FETCH_MY_SIGHTINGS_FAILURE'

export const fetchMySightingsRequest = () => ({
  type: FETCH_MY_SIGHTINGS_REQUEST,
})

export const fetchMySightingsSuccess = (sightings) => ({
  type: FETCH_MY_SIGHTINGS_SUCCESS,
  payload: sightings,
})

export const fetchMySightingsFailure = (error) => ({
  type: FETCH_MY_SIGHTINGS_FAILURE,
  payload: error,
})

export const fetchMySightings = (token) => (dispatch) => {
  dispatch(fetchMySightingsRequest())
  return getMySightingsApi(token)
    .then((sightings) => {
      dispatch(fetchMySightingsSuccess(sightings))
    })
    .catch((error) => {
      dispatch(fetchMySightingsFailure(error))
    })
}

export function fetchSightings() {
  return (dispatch) => {
    return getSightings().then((sightings) => {
      dispatch(setSightings(sightings))
    })
  }
}

export function setSightings(sightings) {
  return {
    type: SET_SIGHTINGS,
    payload: sightings,
  }
}
