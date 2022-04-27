import Head from 'next/head'
import styles from './index.module.scss'
import Header from '@/components/header'
import CardList from '@/components/card-list'
import Map from '@/components/map'

export default function Home() {
  return (
    <>
      <Head>
        <title>AllTrails at Lunch</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <CardList />
        <Map />
      </main>
    </>
  )
}
