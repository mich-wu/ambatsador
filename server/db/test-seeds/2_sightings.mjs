/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  await knex('sightings').del()

  await knex('sightings').insert([
    {
      id: 1,
      batId: 1,
      userId: 'auth0|123',
      latitude: -36.864619483100846,
      longitude: 174.77603472868145,
      image: 'sighting1.jpg',
      description:
        'This was taken just outside the large town of Curio. And only recently did I learn that after a couple of hours, the bat flew into the city to try to build a life there but unfortunately could not cope with the fast pace. It seems Curio city killed the bat.',
      date: new Date(Date.now()),
    },
    {
      id: 2,
      batId: 2,
      userId: 'auth0|123',
      latitude: -36.864619483100846,
      longitude: 174.77603472868145,
      image: 'sighting2.jpg',
      description:
        'I saw this bat outside its home where it had very carefully placed all of its furniture facing a certain direction. Fang Shui I guess.',
      date: new Date(Date.now()),
    },
    {
      id: 3,
      batId: 3,
      userId: 'auth0|124',
      latitude: -24.864619483100846,
      longitude: 174.77603472868145,
      image: 'sighting2.jpg',
      description: 'Wow that is one cute bat',
      date: new Date(Date.now()),
    },
  ])
}
