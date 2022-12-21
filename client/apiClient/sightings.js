import request from 'superagent'

const sightingsUrl = '/api/v1/sightings'

export function addSighting(sighting, token) {
  return request
    .post('/api/v1/sightings/add-sighting')
    .set('Authorization', `Bearer ${token}`)
    .send(sighting)
    .then((res) => {
      return res.body
    })
    .catch(console.error)
}

export function getMySightingsApi(token) {
  return request
    .get(`${sightingsUrl}/cave`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
}
export function getSightings() {
  return request.get(sightingsUrl).then((res) => {
    return res.body
  })
}

export function getSighting(id) {
  return request.get(`${sightingsUrl}/${id}`).then((res) => {
    return res.body
  })
}
