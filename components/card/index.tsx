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
          <p className={styles.moreInfo}><span>{Array.from({ length: card.price_level || 1 }).map((_, i) => (<Fragment key={i}>$</Fragment>))}</span><span>&nbsp; &middot; &nbsp;</span><SupportingText card={card} /></p>
        </div>
        <div className={styles.favorite}><Image src='/heart_empty.png' alt='empty heart' width={22} height={20} /></div>
      </div>
    </div>
  )
}

function SupportingText ({ card }) {
  let text = 'Call for info'
  if (card?.business_status === 'OPERATIONAL') {
    text = card?.opening_hours?.open_now ? 'Open Now' : 'Not Open'
  }
  if (card?.business_status === 'CLOSED_TEMPORARILY') {
    text = card?.permanently_closed ? 'Permanently Closed' : 'Temporarily Closed'
  }
  return <span>{text}</span>
}

export default Card