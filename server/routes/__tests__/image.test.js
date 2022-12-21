import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import request from 'supertest'
import { vi } from 'vitest'

import AddSighting from '../../../client/pages/AddSighting'
import server from '../../server.js'
import { checkJwt } from '../../utils/auth0.js'

const FAKE_CLOUD_NAME = 'fake-cloud-name'
const FAKE_API_KEY = 'fake-api-key'
const FAKE_API_SECRET = 'fake-api-secret'
const FAKE_USER_ID = 'fake-user-id'
const FAKE_SIGNATURE = 'fake-signature'
const FAKE_DATE = 1665831600 // 16/9/2022

beforeAll(() => {
  const date = new Date(FAKE_DATE * 1000)
  vi.useFakeTimers()
  vi.setSystemTime(date)

  process.env.CLOUDINARY_CLOUD_NAME = FAKE_CLOUD_NAME
  process.env.CLOUDINARY_API_KEY = FAKE_API_KEY
  process.env.CLOUDINARY_API_SECRET = FAKE_API_SECRET
})

afterAll(() => {
  vi.useRealTimers()
})

vi.mock('cloudinary', () => ({
  v2: {
    utils: {
      api_sign_request: () => FAKE_SIGNATURE,
    },
  },
}))

vi.mock('../../utils/auth0.js')

describe('GET /api/v1/image/signature', () => {
  describe('when authenticated', () => {
    const FAKE_USER = {
      sub: FAKE_USER_ID,
    }

    checkJwt.mockImplementation((req, res, next) => {
      req.auth = FAKE_USER
      next()
    })

    it('returns a signature', async () => {
      checkJwt.mockImplementation((req, res, next) => {
        req.auth = FAKE_USER
        next()
      })

      return await request(server)
        .get('/api/v1/image/signature')
        .then((response) => {
          expect(response.statusCode).toBe(200)
          expect(response.body.signature).toBe(FAKE_SIGNATURE)
          expect(response.body).toEqual({
            signature: FAKE_SIGNATURE,
            timestamp: FAKE_DATE,
            cloudName: FAKE_CLOUD_NAME,
            apiKey: FAKE_API_KEY,
          })
        })
    })
  })

  describe('when not authenticated', () => {
    it('returns 401', async () => {
      checkJwt.mockImplementation((req, res) => {
        res.sendStatus(401)
      })

      return await request(server)
        .get('/api/v1/image/signature')
        .then((response) => {
          expect(response.statusCode).toBe(401)
        })
    })
  })
})
