import { combineReducers, configureStore } from '@reduxjs/toolkit'

import bats from './reducers/bats'
import mySightings from './reducers/mySightings.js'
import sightings from './reducers/sightings'

export const store = configureStore({
  reducer: combineReducers({ sightings, mySightings, bats }),
})
