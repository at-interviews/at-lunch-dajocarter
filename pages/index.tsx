import Head from 'next/head'
import styles from './index.module.scss'
import Header from '@/components/header'
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
      <Header />
      <main className={styles.container}>
        <CardList isListView={isListView} />
        <Map isListView={isListView} />
      </main>
      <button className={styles.viewFlipButton} onClick={flipView}>{isListView ? 'Map' : 'List'}</button>
    </div>
  )
}
