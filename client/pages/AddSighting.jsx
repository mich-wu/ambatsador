import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getBatsNames } from '../apiClient/bats'
import { addSighting } from '../apiClient/sightings'
import { getImageUrl } from '../utils/image'

const initialState = {
  batId: null,
  latitude: '',
  longitude: '',
  description: '',
  date: '',
  time: '',
}

export default function AddSightingPage() {
  const navigate = useNavigate()
  const { getAccessTokenSilently } = useAuth0()

  const [bats, setBats] = useState([
    { id: '_id1', commonName: 'Long-tailed bat' },
    { id: '_id2', commonName: 'Short-tailed bat' },
  ])
  const [newSighting, setSighting] = useState(initialState)
  const [image, setImage] = useState(null)

  function getDropdownOptions() {
    getBatsNames()
      .then((bats) => {
        setBats(bats)
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  useEffect(() => {
    getDropdownOptions()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setSighting((result) => {
      return { ...result, [name]: value }
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const { latitude, longitude, description } = newSighting

    const batId = newSighting.batId === 'unknown' ? null : newSighting.batId
    // console.log('🚀 ~ file: AddSighting.jsx:57 ~ handleSubmit ~ batId', batId)
    const date = new Date(newSighting.date + ' ' + newSighting.time)
    // console.log('🚀 ~ file: AddSighting.jsx:59 ~ handleSubmit ~ date', date)
    const token = await getAccessTokenSilently()
    // console.log('🚀 ~ file: AddSighting.jsx:61 ~ handleSubmit ~ token', token)

    let imageUrl
    if (image) {
      imageUrl = await getImageUrl(image, token)
    }

    let image5 = imageUrl
    console.log('🚀 ~ file: AddSighting.jsx:68 ~ handleSubmit ~ image', image5)

    await addSighting(
      {
        batId,
        latitude,
        longitude,
        image: imageUrl ?? null,
        description,
        date,
      },
      token
    )

    setSighting(initialState)
    navigate('/cave')
  }

  return (
    <>
      <h1 className='mt-20 font-heading text-2xl text-purple md:text-3xl lg:text-5xl'>
        I SAW A BAT
      </h1>
      <div>
        <form>
          <label htmlFor='batId'>Bat Type: </label>
          <select
            className='m-4 rounded-sm px-4 py-3 text-black'
            onChange={handleChange}
            name='batId'
          >
            <option value='unknown'>Unknown</option>
            {bats.map((bat) => {
              return (
                <option key={bat.id} value={bat.id}>
                  {bat.commonName}
                </option>
              )
            })}
          </select>

          <div className='-mx-3 flex flex-wrap'>
            <div className='mb-6 w-full px-3 md:mb-0'>
              <label htmlFor='latitude'>Latitude: </label>
              <input
                className='m-4 rounded-sm px-4 py-3 text-black'
                type='text'
                name='latitude'
                placeholder='GPS co-ord'
                size='100%'
                onChange={handleChange}
              />
              <label htmlFor='longitude'>Longitude: </label>
              <input
                className='m-4 rounded-sm px-4 py-3 text-black'
                type='text'
                name='longitude'
                placeholder='GPS co-ord'
                size='20'
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='-mx-3 mb-6 flex flex-wrap'>
            <div className='mb-6 w-full px-3 md:mb-0 md:w-1/2'>
              <label htmlFor='date'>Date: </label>
              <input
                className='m-4 rounded-sm px-4 py-3 text-black '
                type='date'
                name='date'
                placeholder='DD/MM/YYYY'
                size='20'
                onChange={handleChange}
              />
              <label htmlFor='time'>Time: </label>
              <input
                className='m-4 rounded-sm px-4 py-3 text-black'
                type='time'
                name='time'
                placeholder='HH:MM AM/PM'
                size='20'
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='-mx-3 mb-6 flex flex-wrap'>
            <div className='w-full px-3 md:w-1/2 '>
              <label htmlFor='description'>Description: </label>
              <input
                className='m-4 w-full rounded-sm px-4 py-3 text-black'
                type='textarea'
                name='description'
                placeholder='Enter a description of the sighting'
                size='100%'
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='-mx-3 mb-6 flex flex-wrap'>
            <div className='w-full px-3'>
              <label htmlFor='image'>
                Upload Photo of Bat
                <input
                  className='m-4 rounded-sm px-4 py-3 text-black'
                  type='file'
                  id='image'
                  placeholder='Image file upload'
                  onChange={(event) => {
                    event.preventDefault()
                    setImage(event.target.files[0])
                  }}
                />
              </label>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className='bg m-4 rounded-sm border-2 border-green px-4 py-3 text-green'
          >
            Add Sighting
          </button>
        </form>
      </div>
    </>
  )
}
