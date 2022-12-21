import '@testing-library/jest-dom'

import { useAuth0 } from '@auth0/auth0-react'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'

import Navigation from '../Navigation'

vitest.mock('@auth0/auth0-react')

const fakeLogin = vitest.fn()
const fakeLogout = vitest.fn()

beforeEach(() => {
  vitest.clearAllMocks()
})

describe('<Navigation />', () => {
  describe('When user is not signed in', () => {
    it('renders sign in button', () => {
      useAuth0.mockReturnValue({
        user: null,
        isAuthenticated: false,
      })

      render(
        <Router>
          <Navigation />
        </Router>
      )
      expect(
        screen.getByRole('button', { name: /sign in/i })
      ).toBeInTheDocument()
    })
    it('should call loginWithRedirect when sign in clicked', () => {
      useAuth0.mockReturnValue({
        user: null,
        isAuthenticated: false,
        loginWithRedirect: fakeLogin,
      })

      render(
        <Router>
          <Navigation />
        </Router>
      )

      const button = screen.getByRole('button', { name: /sign in/i })

      fireEvent.click(button)
      expect(fakeLogin).toHaveBeenCalled()
    })
  })
  describe('When user is signed in', () => {
    it('renders log off button', () => {
      useAuth0.mockReturnValue({
        user: 'james',
        isAuthenticated: true,
      })

      render(
        <Router>
          <Navigation />
        </Router>
      )
      expect(
        screen.getByRole('button', { name: /log off/i })
      ).toBeInTheDocument()
    })

    it('should call logout() when logout is clicked', () => {
      useAuth0.mockReturnValue({
        user: null,
        isAuthenticated: true,
        logout: fakeLogout,
      })

      render(
        <Router>
          <Navigation />
        </Router>
      )

      const button = screen.getByRole('button', { name: /log off/i })

      fireEvent.click(button)
      expect(fakeLogout).toHaveBeenCalledTimes(1)
    })
  })
})
