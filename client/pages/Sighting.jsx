import '../sighting.css'

import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getSighting } from '../apiClient/sightings'
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../components/Authenticated'

export default function Sighting() {
  const { id } = useParams()
  const [sightingData, setSightingData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [commentForm, setCommentForm] = useState('')
  const { loginWithPopup } = useAuth0()

  const handleSignIn = (e) => {
    e.preventDefault()
    loginWithPopup()
  }

  function handleChange(e) {
    setCommentForm(e.target.value)
  }

  function handleAddComment(e) {
    e.preventDefault()
    //todo: add comment to database
  }

  useEffect(() => {
    getSighting(id)
      .then((res) => {
        setSightingData(res)
      })
      .finally(() => {
        setIsLoading(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  const date = new Date(sightingData.date).toLocaleDateString('en-US')
  const time = new Date(sightingData.date).toLocaleTimeString('en-US')

  console.log(sightingData, 'sightingData')
  if (isLoading) return <>Loading...</>

  return (
    <div className='container'>
      <div className='title-ribbon'>
        <h1 className='title font-heading text-2xl text-pink md:text-3xl lg:text-5xl'>
          FANG SIGHTING No.{sightingData.id}
        </h1>
        <IfAuthenticated>
          <div className='user'>
            <h1 className='welcome'>Welcome Ambatsador</h1>
            <div className='button-container'>
              <button className='button'>Edit</button>
              <button className='button'>Delete</button>
            </div>
          </div>
        </IfAuthenticated>
      </div>
      <div className='main-body'>
        <img
          className='image'
          src={
            !sightingData.image?.startsWith('http')
              ? `/images/${sightingData.image}`
              : sightingData.image
          }
          alt={sightingData.image}
        />
        <div className='description-container max-w-md'>
          <p>Bat Type: {sightingData.batsName}</p>
          <p>
            Location Sighted: Latitude: {sightingData.latitude} Longitude:{' '}
            {sightingData.longitude}
          </p>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
          <p>Description: {sightingData.description}</p>
          <div className='comments-body'>
            <IfNotAuthenticated>
              <button className='sign-in-button' onClick={handleSignIn}>
                Sign in to comment
              </button>
            </IfNotAuthenticated>
            <IfAuthenticated>
              <form onSubmit={handleAddComment} className='comment-form'>
                <label htmlFor='form'>Comment: </label>
                <input
                  type='text'
                  name='form'
                  value={commentForm}
                  onChange={handleChange}
                  required
                  className='text-form'
                ></input>
                <button className='button' type='submit'>
                  Add
                </button>
              </form>
            </IfAuthenticated>
            <div className='comments-container'>
              {/* todo map comments from database */}
              <p className='comment'>Nice!</p>
              <p className='comment'>Wow!</p>
              <p className='comment'>Abit too hairy for me..</p>
              <p className='comment'>Cool!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
