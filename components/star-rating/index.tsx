import Image from 'next/image'
import styles from './index.module.scss'

function StarRating ({ stars, rating }: { stars: number; rating: number; }) {
  return (
    <div className={styles.container}>
      {Array.from({ length: stars }).map((_, i) => (<Image key={i} src='/star_full.png' alt='Filled-in Star' width={15} height={15} />))}
      {Array.from({ length: (5 - stars) }).map((_, i) => (<Image key={i} src='/star_empty.png' alt='Empty Star' width={15} height={15} />))}
      <span>({ rating })</span>
    </div>
  )
}

export default StarRating