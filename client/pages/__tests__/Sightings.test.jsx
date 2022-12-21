import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import Sightings from '../Sightings'
vi.mock('react-redux')

describe('<Sightings />', () => {
  it('renders a heading', () => {
    render(<Sightings />, { wrapper: MemoryRouter })
    expect(
      screen.getByRole('heading', { name: 'The All Bats' })
    ).toBeInTheDocument()
  })
  it('renders all the sightings', () => {
    useSelector.mockReturnValue([
      {
        id: 1,
        batsName: 'Greater short-tailed bat',
        userId: 'auth0|123',
        latitude: -36.864619483100846,
        longitude: 174.77603472868145,
        image: 'sighting1.jpg',
        description: 'I saw a bat',
        date: 1669152577821,
      },
      {
        id: 2,
        batsName: 'Hairy',
        userId: 'auth0|123',
        latitude: -36.864619483100846,
        longitude: 174.77603472868145,
        image: 'sighting2.jpg',
        description: 'The fat one.',
        date: 1669152577821,
      },
    ])
    render(<Sightings />, { wrapper: MemoryRouter })
    expect(screen.getByText('Greater short-tailed bat')).toBeVisible()
    expect(screen.getByText('Hairy')).toBeVisible()
  })
})
