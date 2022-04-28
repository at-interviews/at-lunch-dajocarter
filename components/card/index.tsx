import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import StarRating from '../star-rating'
import styles from './index.module.scss'
import Cookies from 'js-cookie'
import { Restaurant } from '@/pages/index'

function Card ({ card }: { card: Restaurant }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [photoURL, setPhotoURL] = useState('')

  useEffect(() => {
    const favCookie = Cookies.get('favorites')
    let favorites = []
    if (favCookie) {
      favorites = JSON.parse(favCookie)
    }
    if (Array.isArray(favorites) && favorites.length) {
      if (favorites.includes(card.place_id)) setIsFavorite(true)
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

  useEffect(() => {
    async function getPhoto(id: string) {
      const response = await fetch(`/api/photos/${id}`)
      const data = await response.json()
      setPhotoURL(data.url)
    }
    if (Array.isArray(card.photos) && card.photos.length) {
      getPhoto(card.photos[0].photo_reference)
    }
  }, [card.photos])

  return (
    <div className={styles.card}>
      {photoURL
        ? <Image src={photoURL} alt='Restaurant Photo' width={64} height={64} />
        : <div className={styles.loadingPhoto} />
      }
      <div className={styles.cardInfo}>
        <div className={styles.restaurantInfo}>
          <p className={styles.title}>{card.name}</p>
          <StarRating stars={Math.floor(card.rating)} rating={card.user_ratings_total} />
          <p className={styles.moreInfo}><span>{Array.from({ length: card.price_level || 1 }).map((_, i) => (<Fragment key={i}>$</Fragment>))}</span><span>&nbsp; &middot; &nbsp;</span><SupportingText card={card} /></p>
        </div>
        <div className={styles.favorite}>
          {isFavorite
            ? <Image src='/heart_full.png' alt='restaurant favorited' width={22} height={20} onClick={toggleFavorite} />
            : <Image src='/heart_empty.png' alt='empty heart' width={22} height={20} onClick={toggleFavorite} />
          }
        </div>
      </div>
    </div>
  )
}

function SupportingText ({ card }: { card: Restaurant }) {
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