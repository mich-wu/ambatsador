import connection from '../connection.js'

export function getBatsNames(db = connection) {
  return db('bats').select('id', 'commonName')
}

export function getBats(db = connection) {
  return db('bats').select()
}
