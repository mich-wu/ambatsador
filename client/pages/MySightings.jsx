import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { FullPageSpinner } from '../components/layout/Spinner'
import LandingCard from '../components/MySightingsCard'
import {
  fetchMySightings,
  fetchMySightingsFailure,
} from '../redux/actions/sightings'

export default function MySightingsPage() {
  const { getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const {
    data: mySightings,
    loading,
    error,
  } = useSelector((state) => state.mySightings)

  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => {
        dispatch(fetchMySightings(token))
      })
      .catch(() => {
        dispatch(fetchMySightingsFailure('Oooooohhhh no bats for you'))
      })
  }, [])

  if (error) {
    return (
      <>
        <h2>Ooooo0o0o no bats for you</h2>
      </>
    )
  }

  return (
    <>
      <h1 className='font-heading text-2xl text-orange md:text-3xl lg:text-5xl'>
        My Bat Cave
      </h1>
      {loading ? (
        <FullPageSpinner />
      ) : (
        <div
          data-testid='my-sightings'
          className='mt-10 grid gap-4 lg:grid-cols-4'
        >
          {mySightings?.length === 0 ? (
            <div className='w-96'>
              <h2 className='text-xl text-slate-400'>
                Oh no! You don&apos;t have any sightings, you can{' '}
                <Link
                  to='/add-sighting'
                  aria-label='Add a sighting'
                  className='text-orange hover:underline'
                >
                  add a sighting here
                </Link>
              </h2>
            </div>
          ) : (
            mySightings?.map((sighting) => {
              function formateDate() {
                const badDate = new Date(sighting.date)
                const goodDate = badDate.toLocaleString()
                return goodDate
              }

              return (
                <LandingCard
                  key={sighting.id}
                  src={
                    !sighting.image?.startsWith('http')
                      ? `/images/${sighting.image}`
                      : sighting.image
                  }
                  title={`Sighting No: ${sighting.id}`}
                  batid={`Bat: ${sighting.batId}`}
                  description={`${sighting.description}`}
                  gps={`GPS: ${sighting.latitude}, ${sighting.longitude}`}
                  date={`${formateDate()}`}
                  href={`/sightings/${sighting.id}`}
                  variant='green'
                />
              )
            })
          )}
        </div>
      )}
    </>
  )
}
