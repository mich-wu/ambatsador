import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchBats } from '../redux/actions/bats'
import Bat from './Bat.jsx'
import styles from './Bats.module.scss'

export default function BatsPage() {
  const dispatch = useDispatch()
  const bats = useSelector((state) => state.bats)
  const [selectedBat, setSelected] = useState([])

  useEffect(() => {
    dispatch(fetchBats())
  }, [])

  function mouseEnter(id) {
    const bat = bats.find((bat) => bat.id === id)
    setSelected(bat)
  }

  return (
    <>
      <h1 className='font-heading text-2xl text-green md:text-3xl lg:text-5xl'>
        THE BAT OF THE LAND
      </h1>
      <div className={styles['full-width']}>
        <section className={styles['c-hero-flex']}>
          {bats.map((bat) => {
            return <Bat key={bat.id} bat={bat} mouseEnter={mouseEnter} />
          })}
        </section>
        <div
          style={{
            backgroundColor: 'rgba(80,250,123,.3)',
            textAlign: 'center',
          }}
        >
          <p>{selectedBat?.commonName}</p>
          <p>{selectedBat?.scientificName}</p>
          <p>Threat Status: {selectedBat?.threatStatus}</p>
          <p>Location: {selectedBat?.location}</p>
          <p>Image Credits: {selectedBat?.photographer}</p>
        </div>
      </div>
    </>
  )
}
