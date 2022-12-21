import { useAuth0 } from '@auth0/auth0-react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import Logo from './layout/Logo'

export default function Navigation() {
  const { logout, loginWithRedirect } = useAuth0()

  const handleLogOff = (e) => {
    e.preventDefault()
    logout()
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    loginWithRedirect()
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    await loginWithRedirect({
      screen_hint: 'signup',
    })
  }

  return (
    <Popover className='gradient-y-to-p relative'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <div className='flex items-center justify-between py-6 md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <Link to='/'>
              <span className='sr-only'>Ambatsador</span>
              <Logo className='w-12 sm:w-24' />
            </Link>
          </div>
          {/* DESKTOP */}
          <nav className='hidden space-x-10 md:flex'>
            <DesktopLink to='/bats'>Bats</DesktopLink>
            <DesktopLink to='/sightings'>Sightings</DesktopLink>
            {/* Only render extra options if signed in */}
            <IfAuthenticated>
              <DesktopLink to='/cave'>My Sightings</DesktopLink>
              <DesktopLink to='/add-sighting'>Add Sighting</DesktopLink>
            </IfAuthenticated>
          </nav>
          {/* MOBILE */}
          <div className='-my-2 -mr-2 md:hidden'>
            <IfAuthenticated>
              <AddSightingLink />
            </IfAuthenticated>
            <Popover.Button className='inline-flex items-center justify-center rounded-md p-2 text-slate-600 mix-blend-luminosity hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue'>
              <span className='sr-only'>Open menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </Popover.Button>
          </div>

          {/* DESKTOP */}
          <div className='hidden items-center justify-end md:flex md:flex-1 md:space-x-4 lg:w-0'>
            <IfNotAuthenticated>
              <button
                onClick={handleSignIn}
                className='whitespace-nowrap text-base font-medium text-slate-600 mix-blend-luminosity hover:text-slate-500'
              >
                Sign in
              </button>
              <button
                onClick={handleSignUp}
                className='inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-fuchsia-200 px-4 py-2 text-base font-medium text-fuchsia-900 shadow-sm hover:bg-fuchsia-300'
              >
                Sign up
              </button>
            </IfNotAuthenticated>
            {/* Render add sighting button & sign out if signed in */}
            <IfAuthenticated>
              <button
                onClick={handleLogOff}
                className='whitespace-nowrap text-base font-medium text-slate-600 mix-blend-luminosity hover:text-slate-500'
              >
                Log off
              </button>
            </IfAuthenticated>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <Transition
        as={Fragment}
        enter='duration-200 ease-out'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='duration-100 ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Popover.Panel
          focus
          className='absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden'
        >
          <div className='divide-y-2 divide-gray-700 rounded-lg bg-background shadow-lg ring-1 ring-blue ring-opacity-5'>
            <div className='px-5 pt-5 pb-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <Logo color='white' />
                </div>
                <div className='-mr-2'>
                  <Popover.Button className='inline-flex items-center justify-center rounded-md bg-background p-2 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue'>
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className='space-y-6 py-6 px-5'>
              <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                {/* TODO: use array here, add icons TODO BEFORE RELEASE */}
                <Link
                  to='#'
                  className='text-base font-medium hover:text-slate-200'
                >
                  Bats
                </Link>

                <Link
                  to='#'
                  className='text-base font-medium hover:text-slate-200'
                >
                  Sightings
                </Link>
                {/* Render other options if signed in */}
                <IfAuthenticated>
                  <button
                    onClick={handleLogOff}
                    className='gradient-y-to-p flex w-full items-center justify-center rounded-md px-4 py-2 text-base font-medium'
                  >
                    <span className='text-slate-600 mix-blend-luminosity hover:text-slate-500'>
                      Log out
                    </span>
                  </button>
                </IfAuthenticated>
              </div>
              {/* Render sign out/don't render sign in & sign up if signed in */}
              <div>
                <IfNotAuthenticated>
                  <button
                    onClick={handleSignUp}
                    className='gradient-y-to-p flex w-full items-center justify-center rounded-md px-4 py-2 text-base font-medium'
                  >
                    <span className='text-slate-600 mix-blend-luminosity hover:text-slate-500'>
                      Sign up
                    </span>
                  </button>
                  <p className='mt-6 text-center text-base font-medium'>
                    Existing bat-watcher?{' '}
                    <button
                      onClick={handleSignIn}
                      className='text-yellow hover:underline'
                    >
                      Sign in
                    </button>
                  </p>
                </IfNotAuthenticated>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

/**
 *
 * @returns A link to the add sighting page, use this when the user is authenticated
 */
export function AddSightingLink() {
  return (
    <Link
      to='/add-sighting'
      className='inline-flex items-center justify-center rounded-md p-2 text-slate-600 mix-blend-luminosity hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue'
    >
      <span className='sr-only'>Add Sighting</span>
      <PlusIcon className='h-6 w-6' aria-hidden='true' />
    </Link>
  )
}

export function DesktopLink({ to, children }) {
  return (
    <Link
      to={to}
      className='font-body text-base font-bold text-slate-600 mix-blend-luminosity hover:text-slate-500 lg:text-lg'
    >
      {children}
    </Link>
  )
}
