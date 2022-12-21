import { getBats } from '../../apiClient/bats'

export function showBats(bats) {
  return {
    type: 'GET_BATS',
    payload: bats,
  }
}

export function fetchBats() {
  return (dispatch) => {
    return getBats()
      .then((bats) => {
        dispatch(showBats(bats))
        return null
      })
      .catch((err) => console.error(err.message))
  }
}
