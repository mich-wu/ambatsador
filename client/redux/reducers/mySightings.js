import {
  FETCH_MY_SIGHTINGS_FAILURE,
  FETCH_MY_SIGHTINGS_REQUEST,
  FETCH_MY_SIGHTINGS_SUCCESS,
} from '../actions/sightings'

const initialState = {
  data: null,
  error: null,
  loading: false,
}

export default function mySightingsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MY_SIGHTINGS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      }

    case FETCH_MY_SIGHTINGS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      }

    case FETCH_MY_SIGHTINGS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
