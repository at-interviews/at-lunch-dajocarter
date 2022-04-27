
import styles from './index.module.scss'

function SearchForm () {
  return (
    <div className={styles.searchContainer}>
      <button className={styles.sortButton}>Sort</button>
      <form>
        <input type='search' placeholder='Search for a restaurant' className={styles.searchInput} />
      </form>
    </div>
  )
}

export default SearchForm