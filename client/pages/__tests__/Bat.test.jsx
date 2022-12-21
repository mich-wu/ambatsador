import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import React from 'react'

import Bat from '../Bat'

describe('Bat component tests:', () => {
  it('gets image from props', () => {
    const props = {
      bat: {
        id: 1,
        image: 'long-tailed.jpg',
        commonName: 'Long-tailed bat',
      },
    }
    render(<Bat {...props}></Bat>)
    const batAltText = screen.getByTestId('bat-image')
    expect(batAltText).toBeInTheDocument()
  })
})
