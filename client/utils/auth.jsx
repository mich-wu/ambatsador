import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { FullPageSpinner } from '../components/layout/Spinner'

export function Auth0ProviderWithRedirectCallback({ children }) {
  const navigate = useNavigate()
  function onRedirectCallback(appState) {
    navigate(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      onRedirectCallback={onRedirectCallback}
      redirectUri={window.location.origin}
      domain='https://aihe-ahoaho-2022-razel.au.auth0.com'
      clientId='hiH4R4bHwthbKFXq64aZSwZcXIYQicP4'
      audience='https://ambatsador/api'
    >
      {children}
    </Auth0Provider>
  )
}

export function ProtectedRoute({ component }) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <FullPageSpinner text={'Signing in...'} />,
  })

  return <Component />
}
