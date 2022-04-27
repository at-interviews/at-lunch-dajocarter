import Image from 'next/image'
import StarRating from '../star-rating'
import styles from './index.module.scss'

function Card () {
  return (
    <div className={styles.card}>
      <Image src='/martis-trail.jpg' alt='Restaurant Logo' width={64} height={64} />
      <div className={styles.cardInfo}>
        <div className={styles.restaurantInfo}>
          <p className={styles.title}>Restaurant Name</p>
          <StarRating stars={3} rating={420} />
          <p className={styles.moreInfo}><span>$$$</span><span>&nbsp; &middot; &nbsp;</span><span>Supporting Text</span></p>
        </div>
        <div className={styles.favorite}><Image src='/heart_empty.png' alt='empty heart' width={22} height={20} /></div>
      </div>
    </div>
  )
}

export default Card