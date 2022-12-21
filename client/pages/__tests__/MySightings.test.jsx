import '@testing-library/jest-dom'

import { useAuth0 } from '@auth0/auth0-react'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LandingCard from '../../components/MySightingsCard'
import MySightingsPage from '../MySightings'

vi.mock('react-redux')
vi.mock('../../components/MySightingsCard')
vi.mock('@auth0/auth0-react')

const mockGetAccessToken = vi
  .fn()
  .mockImplementation(() => Promise.resolve('fake-token'))

LandingCard.mockImplementation(() => (
  <div data-testid='my-sighting-card'>LandingCard</div>
))
useAuth0.mockImplementation(() => ({
  getAccessTokenSilently: mockGetAccessToken,
}))

const fakeDispatch = vi.fn()
useDispatch.mockReturnValue(fakeDispatch)

describe('<MySightings/>', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows My Bat Cave heading', () => {
    useSelector.mockReturnValue({
      data: [
        { id: 1, bat: 1 },
        { id: 2, bat: 2 },
      ],
      loading: false,
      error: null,
    })
    render(<MySightingsPage />)
    const heading = screen.getByRole('heading', { name: 'My Bat Cave' })
    const landingCardContainer = screen.getByTestId('my-sightings')
    const landingCards = screen.getAllByTestId('my-sighting-card')
    expect(heading).toBeInTheDocument()
    expect(landingCardContainer).toBeInTheDocument()
    expect(landingCards).toHaveLength(2)
  })

  it('Renders error message when mySightings does not work', () => {
    useSelector.mockReturnValue({
      data: null,
      loading: false,
      error: 'Oooooohhhh no bats for you',
    })
    render(<MySightingsPage />)
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
  })
})
