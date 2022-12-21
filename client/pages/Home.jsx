import LandingCard from '../components/GradientCard'

export default function HomePage() {
  return (
    <>
      <h1 className='mt-6 font-heading text-5xl text-yellow lg:text-7xl'>
        Ambatsador
      </h1>
      <p className='text-lg text-slate-400 md:text-2xl'>
        An app about bats, inspired by the Dracula theme
      </p>
      <div className='mx-auto mt-8 max-w-screen-xl lg:mt-16'>
        <ul className='grid gap-4 p-0 md:grid-cols-2'>
          <LandingCard
            href='/bats'
            title='Bats'
            body='What can you find out about the local bats?'
            src='/images/central-lesser-short-tailed.jpg'
            alt='Central Lesser Short Tailed having a sniff'
            variant='green'
          />
          <LandingCard
            href='/sightings'
            title='Sightings'
            body="Do you have what it takes to find 'em all?"
            src='/images/sighting1.jpg'
            alt='Sighting number one'
            variant='blue'
          />
        </ul>
      </div>
    </>
  )
}
