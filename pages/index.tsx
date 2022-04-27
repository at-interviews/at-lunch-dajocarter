import Head from 'next/head'
import Image from 'next/image'
import styles from './index.module.scss'
import CardList from '@/components/card-list'
import { FormEvent, useState, useRef, useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
  version: 'weekly',
  libraries: ['places']
});

export default function Home() {
  const [isListView, setListView] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [googleAPI, setGoogleAPI] = useState(null)
  const [map, setMap] = useState(null)
  const [mapMarkers, setMapMarkers] = useState([])
  const [restaurants, setRestaurants] = useState([])

  function flipView () {
    setListView(isListView => !isListView)
  }

  function handleSearch (e: FormEvent) {
    e.preventDefault()
    // clear markers on search
    mapMarkers.forEach(marker => marker.setMap(null))
    setMapMarkers([])
    // request restaurants
    const mapCenter = map.getCenter()
    fetch(`/api/search?keyword=${searchQuery}&location=${mapCenter.lat()},${mapCenter.lng()}`)
      .then(res => res.json())
      .then(data => {
        setRestaurants(data)
      })
  }

  useEffect(() => {
    if (restaurants.length) {
      restaurants.forEach(place => {
        const marker = new googleAPI.maps.Marker({
          position: place.geometry.location,
          title: place.name
        })
        marker.setMap(map)
        setMapMarkers(markers => [...markers, marker])
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
 
  return (
    <div className={styles.body}>
      <Head>
        <title>AllTrails at Lunch</title>
      </Head>
      <header className={styles.navbar}>
        <Image src="/Logo.png" alt="AllTrails At Lunch" height={34} width={269} />
        <div className={styles.searchContainer}>
          <button className={styles.sortButton}>Sort</button>
          <form onSubmit={handleSearch}>
            <input type='search' placeholder='Search for a restaurant' className={styles.searchInput} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </form>
        </div>
      </header>
      <main className={styles.container}>
        <CardList isListView={isListView} cards={restaurants} />
        <div className={`${styles['mapContainer']} ${isListView ? styles['outView'] : styles['inView']}`}>
          <div className={styles.map} ref={googleMapRef} />
        </div>
      </main>
      <button className={styles.viewFlipButton} onClick={flipView}>{isListView ? 'Map' : 'List'}</button>
    </div>
  )
}
