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
      commonName: 'Northern lesser short-tailed bat',
      scientificName: 'Mystacina tuberculata aupourica',
      threatStatus: 'At risk - recovering',
      location: 'Two sites in Northland and one on Little Barrier Island',
      image: 'northern-lesser-short-tailed.jpg',
      photographer: 'Rob Suisted',
    },
    {
      id: 4,
      commonName: 'Central lesser short-tailed bat',
      scientificName: 'Mystacina tuberculata rhyacobia ',
      threatStatus: 'At risk - declining',
      location: 'Northland, the central North Island and Taranaki',
      image: 'central-lesser-short-tailed.jpg',
      photographer: "Colin O'Donnell - Department of Conservation",
    },
    {
      id: 5,
      commonName: 'Southern (or South Island) lesser short-tailed bat',
      scientificName: 'Mystacina tuberculata tuberculata',
      threatStatus: 'At risk - recovering',
      location: 'Whenua Hou/Codfish Island and Fiordland areas',
      image: 'southern-lesser-short-tailed.jpg',
      photographer: 'Dan Riskin - Department of Conservation',
    },
  ])
}
