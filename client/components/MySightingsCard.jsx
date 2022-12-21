import { Link } from 'react-router-dom'

import styles from './MySightingsCard.module.css'

export default function MySightingsCard({
  href,
  title,
  body,
  src,
  alt,
  batid,
  description,
  gps,
  date,
  variant = 'green',
}) {
  // TODO: add more color variants
  const variantString =
    variant === 'green' ? 'green-yellow-card' : 'blue-red-card'
  return (
    <li className={`${styles.card} ${styles[variantString]} group`}>
      <Link to={href}>
        <img
          src={src}
          alt={alt}
          className='h-48 w-full rounded-t-md object-cover'
        />
        <div className='p-2'>
          <h2
            className={`font-heading text-xl ${
              variant === 'green'
                ? 'group-hover:text-green'
                : 'group-hover:text-blue'
            }`}
          >
            {title}
            <span>&rarr;</span>
          </h2>
          <p>{batid}</p>
          <p>{gps}</p>
          <p>{date}</p>
          <p>Description</p>
          <p className='h-30 line-clamp-5'>{description}</p>
        </div>
      </Link>
    </li>
  )
}
