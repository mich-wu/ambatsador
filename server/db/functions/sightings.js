import connection from '../connection.js'

export function addSighting(sighting, db = connection) {
  return db('sightings').insert(sighting)
}

export function getSightings(db = connection) {
  return db('sightings')
    .join('bats', 'bats.id', 'sightings.batId')
    .select(
      'sightings.id as id',
      'sightings.userId as userId',
      'longitude',
      'sightings.latitude as latitude',
      'sightings.image as image',
      'sightings.description as description',
      'bats.commonName as batsName',
      'date'
    )
}

export function getSightingById(identifier, db = connection) {
  return db('sightings')
    .join('bats', 'bats.id', 'sightings.batId')
    .select(
      'sightings.id as id',
      'sightings.userId as userId',
      'longitude',
      'sightings.latitude as latitude',
      'sightings.image as image',
      'sightings.description as description',
      'bats.commonName as batsName',
      'date'
    )
    .where('sightings.id', identifier)
    .first()
}

export function getMySightings(userId, db = connection) {
  return db('sightings').select().where({ userId })
}
