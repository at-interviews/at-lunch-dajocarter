import Head from 'next/head'
import Image from 'next/image'
import styles from './index.module.scss'
import { FormEvent, useState, useRef, useEffect } from 'react'
import { renderToString } from 'react-dom/server'
import { Loader } from '@googlemaps/js-api-loader'
import SortButton from '@/components/sort'
import Card from '@/components/card'

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY || '',
  version: 'weekly',
  libraries: ['places']
});

export interface Restaurant {
  business_status?: 'OPERATIONAL' | 'CLOSED_TEMPORARILY'
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  }
  name: string;
  opening_hours?: {
    open_now: boolean;
  }
  photos: { photo_reference: string }[];
  permanently_closed?: boolean;
  place_id: string;
  price_level?: number;
  rating: number;
  user_ratings_total: number;
}

interface Marker {
  addListener: (arg0: string, arg1: () => void) => void;
  setIcon: (arg0: string) => void;
  setMap: (arg0: any) => void;
}

interface InfoWindow {
  close: () => void;
  setContent: (arg0: string) => void;
  open: (arg0: any, arg1: Marker) => void;
}

export default function Home() {
  const [isListView, setListView] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [googleAPI, setGoogleAPI] = useState<any>(null)
  const [map, setMap] = useState<any>(null)
  const [mapObjects, setMapObjects] = useState<{[key: string]: { marker: Marker; infoWindow: InfoWindow; }}>({})
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [sortingPref, setSortingPref] = useState('')
  const [sortingApplied, applySort] = useState(false)
  const [activeRestaurant, setActiveRestaurant] = useState<Restaurant | null>(null)

  function sortRestauraunts(restaurants: Restaurant[], preference: string) {
    let sortedRestaurants = restaurants
    if (preference === 'DESC') {
      sortedRestaurants = restaurants.sort((a, b) => b.rating - a.rating)
    } else if (preference === 'ASC') {
      sortedRestaurants = restaurants.sort((a, b) => a.rating - b.rating)
    }
    return sortedRestaurants
  }

  function handleSearch (e: FormEvent) {
    e.preventDefault()
    // clear markers on search
    Object.values(mapObjects).forEach(({ marker }) => marker.setMap(null))
    setMapObjects({})
    // request restaurants
    const mapCenter = map.getCenter()
    fetch(`/api/search?keyword=${searchQuery}&location=${mapCenter.lat()},${mapCenter.lng()}`)
      .then(res => res.json())
      .then((data: Restaurant[]) => {
        let sortedRestaurants = data
        if (sortingApplied && sortingPref) sortedRestaurants = sortRestauraunts(data, sortingPref)
        setRestaurants(sortedRestaurants)
      })
  }

  function openWindow (restaurant: Restaurant) {
    setActiveRestaurant(restaurant)
    const { marker, infoWindow } = mapObjects[restaurant.place_id]
    infoWindow.setContent(
      renderToString(<Card card={restaurant} inMap={true} />)
    )
    infoWindow.open(map, marker)
    marker.setIcon('/pin_selected.png')
  }

  function closeWindow (placeId: string) {
    setActiveRestaurant(null)
    const { marker, infoWindow } = mapObjects[placeId]
    marker.setIcon('/pin_unselected.png')
    infoWindow.close()
  }

  useEffect(() => {
    if (restaurants.length) {
      restaurants.forEach(place => {
        const marker: Marker = new googleAPI.maps.Marker({
          position: place.geometry.location,
          title: place.name,
          icon: '/pin_unselected.png'
        })
        marker.setMap(map)
        const infoWindow: InfoWindow = new googleAPI.maps.InfoWindow()
        marker.addListener('mouseover', () => {
          setActiveRestaurant(place)
          infoWindow.setContent(
            renderToString(<Card card={place} inMap={true} />)
          )
          infoWindow.open(map, marker)
          marker.setIcon('/pin_selected.png')
        })
        marker.addListener('mouseout', () => {
          setActiveRestaurant(null)
          marker.setIcon('/pin_unselected.png')
          infoWindow.close()
        })
        setMapObjects(mapObjects => ({ ...mapObjects, [place.place_id]: { marker, infoWindow } }))
      })
    }
  }, [restaurants, map, googleAPI])

  const googleMapRef = useRef(null);
  useEffect(() => {
    loader.load().then((google) => {
      const googleMap = new google.maps.Map(googleMapRef.current, {
        center: { lat: 37.79117, lng: -122.4061274 },
        zoom: 15,
        fullscreenControl: false, // remove the full-screen option
        mapTypeControl: false, // remove the satellite-view option
        streetViewControl: false, // remove the street-view option
        zoomControl: false, // remove zoom controls
      });
      setGoogleAPI(google)
      setMap(googleMap)
    });
  }, []);

  function handleSort (pref: string) {
    applySort(true)
    setSortingPref(pref)
    const sortedRestaurants = sortRestauraunts(restaurants, pref)
    setRestaurants(sortedRestaurants)
  }

  return (
    <div className={styles.body}>
      <Head>
        <title>AllTrails at Lunch</title>
      </Head>
      <header className={styles.navbar}>
        <Image src="/Logo.png" alt="AllTrails At Lunch" height={34} width={269} />
        <div className={styles.searchContainer}>
          <SortButton handleSort={handleSort} />
          <form onSubmit={handleSearch}>
            <input
              type='search'
              className={styles.searchInput}
              placeholder='Search for a restaurant'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </header>
      <main className={styles.container}>
        <div className={`${styles.cardListContainer} ${isListView ? styles.inView : styles.outView}`}>
          {restaurants.length > 1 && (
            <ul className={styles.cardList}>
              {restaurants.map((restaurant, i) => (
                <li
                  key={i}
                  className={`${styles.cardListItem} ${(activeRestaurant?.place_id === restaurant.place_id) && styles.activeItem}`}
                  onMouseEnter={() => openWindow(restaurant)}
                  onMouseLeave={() => closeWindow(restaurant.place_id)}
                >
                  <Card card={restaurant} inMap={false} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={`${styles.mapContainer} ${isListView ? styles.outView : styles.inView}`}>
          <div className={styles.map} ref={googleMapRef} />
        </div>
      </main>
      <button className={styles.viewFlipButton} onClick={() => setListView(isListView => !isListView)}>{isListView ? 'Map' : 'List'}</button>
    </div>
  )
}
