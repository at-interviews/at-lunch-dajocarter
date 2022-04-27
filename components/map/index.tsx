import styles from './index.module.scss'
import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useRef } from 'react'

function Map ({ isListView }: { isListView: boolean }) {
  const googleMap = useRef(null);
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
      version: 'weekly',
      libraries: ['places']
    });
    loader.load().then((google) => {
      new google.maps.Map(googleMap.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
        fullscreenControl: false, // remove the full-screen option
        mapTypeControl: false, // remove the satellite-view option
        streetViewControl: false, // remove the street-view option
        zoomControl: false, // remove zoom controls
      });
    });
  });

  return (
    <div className={`${styles['container']} ${isListView ? styles['outView'] : styles['inView']}`}>
      <div className={styles.map} ref={googleMap} />
    </div>
  )
}

export default Map