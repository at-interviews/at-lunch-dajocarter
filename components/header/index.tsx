import Image from "next/image"
import SearchForm from "../search-form"
import styles from './index.module.scss'

function Header () {
  return (
    <header className={styles.navbar}>
      <Image src="/Logo.png" alt="AllTrails At Lunch" height={34} width={269} />
      <SearchForm />
    </header>
  )
}

export default Header