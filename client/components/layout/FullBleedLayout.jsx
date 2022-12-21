import { Outlet } from 'react-router-dom'

import Navigation from '../Navigation'

export default function MainLayout() {
  return (
    <div className='flex h-screen flex-col justify-start bg-background text-white'>
      <Navigation />

      <div className='mx-auto w-full p-4 md:max-w-5xl'>
        <Outlet />
      </div>
    </div>
  )
}
