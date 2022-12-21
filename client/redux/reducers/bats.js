const initialState = []

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'GET_BATS':
      return payload
    default:
      return state
  }
}

export default reducer
