import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { list } from 'postcss'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import LandingCard from '../../components/MySightingsCard'

describe('<MySightingsCard />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Renders bats from the API call', () => {
    render(<LandingCard />, { wrapper: MemoryRouter })
    const listItem = screen.getByRole('listitem')
    expect(listItem).toBeInTheDocument()
  })
})
