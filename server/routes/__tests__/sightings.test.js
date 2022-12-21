import request from 'supertest'
import { vi } from 'vitest'

import {
  addSighting,
  getMySightings,
  getSightingById,
  getSightings,
} from '../../db/functions/sightings'
import server from '../../server'
import { checkJwt } from '../../utils/auth0.js'

vi.mock('../../db/functions/sightings.js')

vi.mock('../../utils/auth0.js')

beforeEach(() => {
  checkJwt.mockImplementation((req, res, next) => {
    req.user = { sub: 'auth0|123' }
    next()
  })

  vi.spyOn(console, 'error').mockImplementation(() => {
    return
  })
})

describe('post /sightings', () => {
  test('post sighting of bat', () => {
    addSighting.mockReturnValue(Promise.resolve([1]))
    return request(server)
      .post('/api/v1/sightings/add-sighting')
      .send({ latitude: '123' })
      .then((res) => {
        expect(res.statusCode).toBe(201)
      })
  })
  test('returns an error message', () => {
    addSighting.mockImplementation(() => Promise.reject(new Error('Oops')))
    return request(server)
      .post('/api/v1/sightings/add-sighting')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Oops')
      })
  })
})

describe('GET /api/v1/sightings', () => {
  it('renders all sightings', () => {
    getSightings.mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          batsName: 'Fluffy',
          userId: 'auth0|123',
          latitude: -36.864619483100846,
          longitude: 174.77603472868145,
          image: 'sighting1.jpg',
          description: 'I saw a bat',
          date: 1669152577821,
        },
        {
          id: 2,
          batName: 'Chubby',
          userId: 'auth0|123',
          latitude: -36.864619483100846,
          longitude: 174.77603472868145,
          image: 'sighting2.jpg',
          description: 'The fat one.',
          date: 1669152577821,
        },
      ])
    )
    return request(server)
      .get('/api/v1/sightings')
      .then((res) => {
        expect(res.text).toContain('Fluffy')
        expect(res.text).toContain('Chubby')
      })
  })
})

describe('GET /api/v1/sightings/:id', () => {
  it('renders sighting by id', () => {
    getSightingById.mockReturnValue(
      Promise.resolve({
        id: 2,
        batName: 'Choco',
        description:
          'I saw this bat outside its home where it had very carefully placed all of its furniture facing a certain direction. Fang Shui I guess.',
        date: 1669255595764,
      })
    )

    return request(server)
      .get('/api/v1/sightings/2')
      .then((res) => {
        expect(res.body.batName).toContain('Choco')
        expect(res.body.id).toBe(2)
      })
  })
})

describe('GET /api/v1/sightings/cave', () => {
  it('returns array of bat sightings', () => {
    getMySightings.mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          batId: 1,
          userId: 'auth0|123',
          latitude: -36.864619483100846,
          longitude: 174.77603472868145,
          image: 'sighting1.jpg',
          description:
            'This was taken just outside the large town of Curio. And only recently did I learn that after a couple of hours, the bat flew into the city to try to build a life there but unfortunately could not cope with the fast pace. It seems Curio city killed the bat.',
          date: 1669255595763,
        },
        {
          id: 2,
          batId: 2,
          userId: 'auth0|123',
          latitude: -36.864619483100846,
          longitude: 174.77603472868145,
          image: 'sighting2.jpg',
          description: 'The fat one.',
          date: 1669152577821,
        },
        {
          id: 3,
          batId: 3,
          userId: 'auth0|123',
          latitude: -56.86461948310086,
          longitude: 157.77603472868145,
          image: 'sighting3.jpg',
          description: 'wow look at this tiny cute bat!',
          date: 1669255595765,
        },
      ])
    )

    return request(server)
      .get('/api/v1/sightings/cave')
      .then((res) => {
        const batSightingOne = res.body[0]
        const batSightingTwo = res.body[1]
        expect(res.body).toHaveLength(3)
        expect(batSightingOne.image).toBe('sighting1.jpg')
        expect(batSightingTwo.description).toContain('The fat one.')
      })
  })

  it('Sends a oOOoooOoOooh no bats for you', () => {
    getMySightings.mockImplementation(() => {
      return Promise.reject()
    })
    return request(server)
      .get('/api/v1/sightings/cave')
      .then((res) => {
        expect(res.status).toEqual(500)
        expect(res.text).toContain(
          'Something went wrong with our routes OoooOOOOOooOoh no bats for you'
        )
      })
  })
})
