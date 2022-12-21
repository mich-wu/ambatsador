/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema.createTable('sighting_comments', (table) => {
    table.increments('id').primary()
    table.integer('sightingId').references('sightings.id').onDelete('CASCADE')
    table.string('text')
    table.timestamps(true, true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.dropTable('sighting_comments')
}
