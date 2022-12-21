import express from 'express'

import * as db from '../db/functions/sightings.js'
import { checkJwt } from '../utils/auth0.js'
const router = express.Router()

router.get('/cave', checkJwt, (req, res) => {
  const userId = req.user.sub
  db.getMySightings(userId)
    .then((sightings) => {
      res.json(sightings)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        message:
          'Something went wrong with our routes OoooOOOOOooOoh no bats for you',
      })
    })
})

router.post('/add-sighting', checkJwt, (req, res) => {
  const bat = req.body
  const userId = req.user.sub
  db.addSighting({ ...bat, userId })
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.error(err.message)
      res.sendStatus(500)
    })
})

router.get('/', (req, res) => {
  db.getSightings()
    .then((sighting) => {
      res.json(sighting)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  db.getSightingById(id)
    .then((sighting) => {
      res.json(sighting)
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
})

export default router
