import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import MainLayout from './components/layout/MainLayout'
import AddSightingPage from './pages/AddSighting'
import BatsPage from './pages/Bats'
import HomePage from './pages/Home'
import MySightingsPage from './pages/MySightings'
import Sighting from './pages/Sighting'
import SightingsPage from './pages/Sightings'
import { fetchSightings } from './redux/actions/sightings'
import { ProtectedRoute } from './utils/auth'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSightings())
  }, [])

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='bats' element={<BatsPage />} />
        <Route path='sightings' element={<SightingsPage />} />
        <Route path='sightings/:id' element={<Sighting />} />
        <Route
          path='cave'
          element={<ProtectedRoute component={MySightingsPage} />}
        />
        <Route
          path='add-sighting'
          element={<ProtectedRoute component={AddSightingPage} />}
        />
      </Route>
    </Routes>
  )
}

export default App
