import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import styles from './index.module.scss'
import Cookies from 'js-cookie'
import { Restaurant } from '@/pages/index'

export default function Card ({ card, inMap = false }: { card: Restaurant; inMap?: boolean; }) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favCookie = Cookies.get('favorites')
    let favorites = []
    if (favCookie) {
      favorites = JSON.parse(favCookie)
    }
    if (Array.isArray(favorites) && favorites.length && card.place_id) {
      if (favorites.includes(card.place_id)) {
        setIsFavorite(true)
      }
    }
  }, [card.place_id])

  function toggleFavorite () {
    const favCookie = Cookies.get('favorites')
    let favorites = []
    if (favCookie) {
      favorites = JSON.parse(favCookie)
    }
    if (isFavorite) {
      const favIndex = favorites.indexOf(card.place_id)
      if (favIndex >= 0) favorites.splice(favIndex, 1)
      Cookies.set('favorites', JSON.stringify(favorites))
      setIsFavorite(false)
    } else {
      Cookies.set('favorites', JSON.stringify([...favorites, card.place_id]))
      setIsFavorite(true)
    }
  }

  return (
    <div className={styles.card}>
      {card.photo_url
        ? <Image src={card.photo_url} alt='Restaurant Photo' width={64} height={64} />
        : <div className={styles.loadingPhoto} />
      }
      <div className={styles.cardInfo}>
        <div className={styles.restaurantInfo}>
          <p className={styles.title}>{card.name}</p>
          <StarRating stars={card.rating} rating={card.user_ratings_total} />
          <p className={styles.moreInfo}><span>{Array.from({ length: card.price_level || 1 }).map((_, i) => (<Fragment key={i}>$</Fragment>))}</span><span>&nbsp; &middot; &nbsp;</span><SupportingText card={card} /></p>
        </div>
        {!inMap && (
          <div className={styles.favorite}>
            {isFavorite
              ? <Image src='/heart_full.png' alt='restaurant favorited' width={22} height={20} onClick={toggleFavorite} />
              : <Image src='/heart_empty.png' alt='empty heart' width={22} height={20} onClick={toggleFavorite} />
            }
          </div>
        )}
      </div>
    </div>
  )
}

export function StarRating ({ stars, rating }: { stars: number; rating: number; }) {
  return (
    <div className={styles.ratingsContainer}>
      {Array.from({ length: Math.floor(stars) }).map((_, i) => (<Image key={i} src='/star_full.png' alt='Filled-in Star' width={15} height={15} />))}
      {Array.from({ length: (5 - Math.floor(stars)) }).map((_, i) => (<Image key={i} src='/star_empty.png' alt='Empty Star' width={15} height={15} />))}
      <span>({ rating })</span>
    </div>
  )
}

export function SupportingText ({ card }: { card: Restaurant }) {
  let text = 'Call for info'
  if (card?.business_status === 'OPERATIONAL') {
    text = card?.opening_hours?.open_now ? 'Open Now' : 'Not Open'
  }
  if (card?.business_status === 'CLOSED_TEMPORARILY') {
    text = card?.permanently_closed ? 'Permanently Closed' : 'Temporarily Closed'
  }
  return <span>{text}</span>
}