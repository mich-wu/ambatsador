import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Map from './Map'

export default function SightingsPage() {
  const sightingsData = useSelector((state) => state.sightings)

  return (
    <>
      <h1 className='font-heading text-2xl text-blue md:text-3xl lg:text-5xl'>
        The All Bats
      </h1>
      <div className='mt-8 flex flex-col justify-between gap-12 lg:flex-row'>
        <div className='flex flex-col gap-4'>
          {sightingsData?.map((bat) => {
            return <BatCard bat={bat} key={bat.id} />
          })}
        </div>
        <div className='w-full'>
          <Map sightingsData={sightingsData} />
        </div>
      </div>
    </>
  )
}

function BatCard({ bat }) {
  const { id, image, batsName, description, date } = bat
  return (
    <Link to={`/sightings/${id}`} key={id}>
      <div className='w-full rounded-lg border border-slate-700'>
        <div className='flex h-full flex-row'>
          <img
            src={!image?.startsWith('http') ? `/images/${image}` : image}
            alt='sighting img'
            className='h-auto w-24 rounded-l-lg object-cover'
          />
          <div className='py-2 pr-4 pl-2'>
            <div className='flex flex-row justify-between'>
              <h2 className='font-heading text-lg'>Sighting No.{id}</h2>
              <span className='text-s pt-1'>
                {new Date(date).toLocaleString().split(',')[0]}
              </span>
            </div>
            <h3 className='text-base text-slate-400'>{batsName}</h3>
            <p className='mt-2 text-base text-slate-500 line-clamp-2'>
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
