import styles from './Bats.module.scss'

export default function Bat(props) {
  const { id, image, commonName } = props.bat
  const imageUrl = `/images/${image}`

  return (
    <>
      <a
        aria-label={commonName}
        data-testid='bat-image'
        onMouseEnter={() => props.mouseEnter(id)}
        href='true'
        onClick={(e) => e.preventDefault()}
        className={styles['c-hero-flex__item']}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          cursor: 'default',
        }}
        alt={commonName}
        draggable='false'
      >
        {' '}
      </a>
    </>
  )
}
