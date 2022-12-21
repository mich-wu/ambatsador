import express from 'express'

import * as db from '../db/functions/bats.js'

const router = express.Router()

router.get('/names', (req, res) => {
  db.getBatsNames()
    .then((results) => {
      res.json(results)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.get('/', (req, res) => {
  db.getBats()
    .then((bats) => {
      res.json(bats)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).json({
        message: 'Something went wrong',
      })
    })
})

export default router
