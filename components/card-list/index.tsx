import Card from '../card'
import styles from './index.module.scss'

function CardList ({ isListView }: { isListView: boolean }) {
  return (
    <div className={`${styles['container']} ${isListView ? styles['inView'] : styles['outView']}`}>
      <ol className={styles.cardList}>
        <li><Card /></li>
        <li><Card /></li>
        <li><Card /></li>
        <li><Card /></li>
        <li><Card /></li>
      </ol>
    </div>
  )
}

export default CardList