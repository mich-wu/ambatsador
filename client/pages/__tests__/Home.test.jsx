import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Home from '../Home'

describe('<Home />', () => {
  it('renders without crashing', () => {
    render(<Home />, { wrapper: MemoryRouter })
    expect(screen.getByText(/ambatsador/i)).toBeInTheDocument()
  })
})
