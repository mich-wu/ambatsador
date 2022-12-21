import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import nock from 'nock'
import { MemoryRouter } from 'react-router-dom'

import AddSighting from '../AddSighting'

describe('<AddSighting />', () => {
  it('renders without crashing', () => {
    render(<AddSighting />, { wrapper: MemoryRouter })
    expect(screen.getByText(/I SAW A BAT/i)).toBeInTheDocument()
  })
})

describe('a file is uploaded', () => {
  test('upload file', async () => {
    render(
      <MemoryRouter initialEntries={['/sightings/add-sighting']}>
        <AddSighting />
      </MemoryRouter>
    )

    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const input = screen.getByLabelText(/Upload Photo of Bat/i)

    // TODO: figure out error here
    // await userEvent.upload(input, file)

    // expect(input.files[0]).toBe(file)
    // expect(input.files.item(0)).toBe(file)
    // expect(input.files).toHaveLength(1)
  })
})
