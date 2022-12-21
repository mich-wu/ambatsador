import { Link } from 'react-router-dom'

import styles from './GradientCard.module.css'

export default function LandingCard({
  href,
  title,
  body,
  src,
  alt,
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
          className='h-64 w-full rounded-t-md object-cover'
        />
        <div className='p-2'>
          <h2
            className={`font-heading text-3xl ${
              variant === 'green'
                ? 'group-hover:text-green'
                : 'group-hover:text-blue'
            }`}
          >
            {title}
            <span>&rarr;</span>
          </h2>
          <p>{body}</p>
        </div>
      </Link>
    </li>
  )
}
