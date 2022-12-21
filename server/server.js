import 'dotenv/config'

import express from 'express'
import path from 'path'

import batsRoutes from './routes/bats.js'
import imageRoutes from './routes/image.js'
import sightingsRoutes from './routes/sightings.js'
import usersRoutes from './routes/users.js'
const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

// api-routes go here
server.get('/api/hello-world', (req, res) => {
  res.json({ message: 'Hello World' })
})

// example:
// server.use('/api/dracula', draculaRoutes)
server.use('/api/v1/image', imageRoutes)
server.use('/api/v1/bats', batsRoutes)
server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/sightings', sightingsRoutes)
server.use('/api/v1/bats', batsRoutes)
server.use('/api/*', (req, res) => {
  res.sendStatus(404)
})

const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

if (!isDev) {
  server.use(express.static(path.resolve('dist')))
  server.use('*', (req, res) => {
    res.sendStatus(404)
  })
} else {
  server.use('*', (req, res) => {
    res.status(404).send('Not Found: Running in dev mode')
  })
}

export default server
