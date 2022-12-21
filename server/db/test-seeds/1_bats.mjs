/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  await knex('bats').del()

  await knex('bats').insert([
    {
      id: 1,
      commonName: 'Long-tailed bat',
      scientificName: 'Chalinolobus tuberculatus',
      threatStatus: 'Nationally critical',
      location:
        'North and South Island, Stewart Island, Little Barrier Island, Great Barrier Island and Kapiti Island',
      image: 'long-tailed.jpg',
      photographer: 'John Stone',
    },
    {
      id: 2,
      commonName: 'Greater short-tailed bat',
      scientificName: 'Mystacina robusta',
      threatStatus: 'Data deficient',
      location: 'Was found on two islands off Stewart Island - thought extinct',
      image: 'greater-short-tailed.jpg',
      photographer: 'Don Merton - Department of Conservation',
    },
    {
      id: 3,
      commonName: 'Greater short-tailed bat',
      scientificName: 'Mystacina robusta',
      threatStatus: 'Data deficient',
      location: 'Was found on two islands off Stewart Island - thought extinct',
      image: 'greater-short-tailed.jpg',
      photographer: 'Don Merton - Department of Conservation',
    },
  ])
}
