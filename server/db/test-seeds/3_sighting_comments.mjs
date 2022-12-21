/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  await knex('sighting_comments').del()

  await knex('sighting_comments').insert([
    {
      id: 1,
      sightingId: 2,
      text: 'Bat vibes only',
    },
    {
      id: 2,
      sightingId: 2,
      text: 'Fangtastic',
    },
    {
      id: 3,
      sightingId: 1,
      text: 'If you liked it then you should have put a wing on it',
    },
  ])
}
