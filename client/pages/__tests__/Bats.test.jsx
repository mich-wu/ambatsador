import '@testing-library/jest-dom'

import { fireEvent,render, screen } from '@testing-library/react'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import Bats from '../Bats'

vi.mock('react-redux')

useSelector.mockReturnValue([
    {
      id: 1,
      commonName: 'Long-tailed bat',
      scientificName: 'Chalinolobus tuberculatus',
      threatStatus: 'Nationally critical',
      location:
        'North and South Island, Stewart Island, Little Barrier Island, Great Barrier Island and Kapiti Island',
      image: 'long-tailed.jpg',
      photographer: 'John Stone',
    },
    {
      id: 2,
      commonName: 'Greater short-tailed bat',
      scientificName: 'Mystacina robusta',
      threatStatus: 'Data deficient',
      location: 'Was found on two islands off Stewart Island - thought extinct',
      image: 'greater-short-tailed.jpg',
      photographer: 'Don Merton - Department of Conservation',
    },
])

const fakeDispatch = vi.fn()
useDispatch.mockReturnValue(fakeDispatch)

describe('<Bats />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('check for headings shown', () => {
    render(
      <Router>
        <Bats />
      </Router>
    )
    const headings = screen.getAllByRole('heading')
    expect(headings).toHaveLength(6)
  })
  it('checks mouseEnter', () => {
    render(
      <Router>
        <Bats />
      </Router>
    )
    expect(screen.queryByRole('heading', {name: "Image Credits: John Stone"})).toBeNull()
    const element = screen.getAllByTestId('bat-image')[0]
    fireEvent.mouseOver(element)
    const heading = screen.getByRole('heading', {name: "Image Credits: John Stone"})
    expect(heading).toBeInTheDocument()
  })
})