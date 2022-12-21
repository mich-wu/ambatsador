import React from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

export default function Map({ sightingsData: gps }) {
  let center = [-40.7407959, 173.5249277]
  return (
    <MapContainer
      id='map'
      center={center}
      zoom={5}
      scrollWheelZoom={true}
      style={{
        height: '500px',
        width: '450px',
      }}
      className='mx-auto lg:ml-auto'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {gps?.map(({ id, longitude, latitude }) => (
        <Marker key={id} position={[latitude, longitude]} />
      ))}
    </MapContainer>
  )
}
