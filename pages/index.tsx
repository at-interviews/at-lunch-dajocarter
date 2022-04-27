import Head from 'next/head'
import Image from 'next/image'
import styles from './index.module.scss'
import CardList from '@/components/card-list'
import Map from '@/components/map'
import { useState } from 'react'

export default function Home() {
  const [isListView, setListView] = useState(true)

  function flipView () {
    setListView(isListView => !isListView)
  }
 
  return (
    <div className={styles.body}>
      <Head>
        <title>AllTrails at Lunch</title>
      </Head>
      <header className={styles.navbar}>
        <Image src="/Logo.png" alt="AllTrails At Lunch" height={34} width={269} />
        <div className={styles.searchContainer}>
          <button className={styles.sortButton}>Sort</button>
          <form>
            <input type='search' placeholder='Search for a restaurant' className={styles.searchInput} />
          </form>
        </div>
      </header>
      <main className={styles.container}>
        <CardList isListView={isListView} />
        <Map isListView={isListView} />
      </main>
      <button className={styles.viewFlipButton} onClick={flipView}>{isListView ? 'Map' : 'List'}</button>
    </div>
  )
}
