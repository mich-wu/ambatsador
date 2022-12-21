import { useAuth0 } from '@auth0/auth0-react'

import MainLayout from '../components/layout/MainLayout'
import { FullPageSpinner } from '../components/layout/Spinner'

export const CallbackPage = () => {
  const { error } = useAuth0()

  if (error) {
    return (
      <div className='flex h-screen flex-col justify-center bg-background text-white'>
        <h1 className='text-heading text-red'>Error</h1>
        <div>
          <p>
            <span>{error.message}</span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <MainLayout>
      <FullPageSpinner />
    </MainLayout>
  )
}
