import request from 'superagent'

const rootUrl = '/api/v1/bats'

export function getBatsNames() {
  return request.get(rootUrl + '/names').then((res) => {
    return res.body
  })
}

export function getBats() {
  return request.get('/api/v1/bats').then((res) => {
    return res.body
  })
}
