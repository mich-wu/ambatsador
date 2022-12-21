import nock from 'nock'
import { describe, expect, it } from 'vitest'

import { getImageUrl, uploadImage } from '../image'

const fakeFile = new File(['hello-world'], 'hello.png', { type: 'image/png' })

const FAKE_CLOUD_NAME = 'fake-cloud-name'
const FAKE_API_KEY = 'fake-api-key'
const FAKE_USER_TOKEN = 'fake-user-token'
const FAKE_SIGNATURE = 'fake-signature'
const FAKE_DATE = 1665831600 // 16/9/2022

describe('getImageUrl', () => {
  it('returns imageUrl from uploadImage', () => {
    const localScope = nock('http://localhost')
      .get('/api/v1/image/signature')

      .reply(
        200,
        {
          signature: FAKE_SIGNATURE,
          timestamp: FAKE_DATE,
          apiKey: FAKE_API_KEY,
          cloudName: FAKE_CLOUD_NAME,
        },
        { 'Content-Type': 'application/json' }
      )

    const cloudinaryScope = nock(`https://api.cloudinary.com`)
      .post(`/v1_1/${FAKE_CLOUD_NAME}/image/upload`)
      .reply(200, { url: 'https://my-fake-image.com/image.jpg' })

    return getImageUrl(fakeFile, FAKE_USER_TOKEN).then((imageUrl) => {
      expect(localScope.isDone()).toBe(true)
      expect(cloudinaryScope.isDone()).toBe(true)
      expect(imageUrl).toBe('https://my-fake-image.com/image.jpg')
    })
  })
})

describe('uploadImage', () => {
  it('returns image url', async () => {
    const scope = nock(`https://api.cloudinary.com`)
      .post(`/v1_1/${FAKE_CLOUD_NAME}/image/upload`)
      .reply(200, { url: 'https://my-fake-image.com/image.jpg' })

    const imageUrl = await uploadImage(fakeFile, {
      timestamp: FAKE_DATE,
      signature: FAKE_SIGNATURE,
      apiKey: FAKE_API_KEY,
      cloudName: FAKE_CLOUD_NAME,
    })

    expect(scope.isDone()).toBe(true)
    expect(imageUrl).toBe('https://my-fake-image.com/image.jpg')
  })

  it('fails with missing params', async () => {
    await expect(uploadImage(fakeFile, {})).rejects.toThrowError(
      /missing options/i
    )
  })
})
