import Card from '../card'
import styles from './index.module.scss'

function CardList ({ isListView, cards = [] }: { isListView: boolean; cards: [] }) {
  return (
    <div className={`${styles['container']} ${isListView ? styles['inView'] : styles['outView']}`}>
      {cards.length > 1 && (
        <ol className={styles.cardList}>
          {cards.map((card, i) => (
            <li key={i}><Card card={card} /></li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default CardList