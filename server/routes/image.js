import { v2 as cloudinary } from 'cloudinary'
import express from 'express'

// TODO: authenticate route
import { checkJwt } from '../utils/auth0.js'

const router = express.Router()

// TODO: authenticate route
router.get('/signature', checkJwt, (req, res) => {
  // from https://cloudinary.com/documentation/upload_images#using_cloudinary_backend_sdks_to_generate_sha_authentication_signatures
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  // format: 32147812897523
  const timestamp = Math.round(new Date().getTime() / 1000)

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    apiSecret
  )

  res.json({
    signature,
    timestamp,
    cloudName,
    apiKey,
  })
})

export default router
