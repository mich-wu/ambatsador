import request from 'supertest'
import { vi } from 'vitest'

import server from '../../server'
import { getUserMetadata } from '../../utils/auth0'
import { checkJwt } from '../../utils/auth0'
vi.mock('../../utils/auth0')

const FAKE_USER = 'auth0|123'

describe('GET /users/:id', () => {
  it('should return user metadata on success', () => {
    const userMetadata = {
      name: 'John Doe',
      email: 'john.doe@email.com',
    }

    checkJwt.mockImplementation((req, res, next) => {
      req.auth = FAKE_USER
      next()
    })

    getUserMetadata.mockReturnValue(Promise.resolve(userMetadata))

    return request(server)
      .get('/api/v1/users/123')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual({ user: userMetadata })
      })
  })
})
