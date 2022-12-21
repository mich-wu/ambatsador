import express from 'express'

import { checkJwt } from '../utils/auth0.js'

const router = express.Router()
import { getUserMetadata } from '../utils/auth0.js'

// TODO: authenticate route
router.get('/:id', checkJwt, async (req, res) => {
  const { id } = req.params
  try {
    const userMetadata = await getUserMetadata(id)
    res.json({ user: userMetadata })
  } catch (err) {
    // TODO: handle 404 differently
    console.error(err.message)
    res.status(500).send('Something went wrong')
  }
})

export default router
