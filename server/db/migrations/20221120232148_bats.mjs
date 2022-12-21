/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema.createTable('bats', (table) => {
    table.increments('id').primary()
    table.string('commonName')
    table.string('scientificName')
    table
      .enum('threatStatus', [
        'Data deficient',
        'At risk - declining',
        'At risk - recovering',
        'Nationally critical',
      ])
      .defaultTo('Data deficient')
    table.string('location')
    table.string('image')
    table.string('photographer')
    table.timestamps(true, true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.dropTable('bats')
}
