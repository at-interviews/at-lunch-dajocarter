import Image from 'next/image'
import { Fragment } from 'react'
import StarRating from '../star-rating'
import styles from './index.module.scss'

function Card ({ card }) {
  return (
    <div className={styles.card}>
      <Image src='/martis-trail.jpg' alt='Restaurant Logo' width={64} height={64} />
      <div className={styles.cardInfo}>
        <div className={styles.restaurantInfo}>
          <p className={styles.title}>{card.name}</p>
          <StarRating stars={Math.floor(card.rating)} rating={card.user_ratings_total} />
          <p className={styles.moreInfo}><span>{Array.from({ length: card.price_level || 1 }).map((_, i) => (<Fragment key={i}>$</Fragment>))}</span><span>&nbsp; &middot; &nbsp;</span><span>Supporting Text</span></p>
        </div>
        <div className={styles.favorite}><Image src='/heart_empty.png' alt='empty heart' width={22} height={20} /></div>
      </div>
    </div>
  )
}

export default Card