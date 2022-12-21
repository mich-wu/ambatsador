import { SET_SIGHTINGS } from '../actions/sightings'

const initialState = []

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_SIGHTINGS:
      return payload

    default:
      return state
  }
}
export default reducer
