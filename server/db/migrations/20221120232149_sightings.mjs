/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema.createTable('sightings', (table) => {
    table.increments('id').primary()
    table.integer('batId').references('bats.id').onDelete('CASCADE')
    table.string('userId')
    table.float('latitude')
    table.float('longitude')
    table.string('image')
    table.text('description')
    table.date('date')
    table.timestamps(true, true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.dropTable('sightings')
}
