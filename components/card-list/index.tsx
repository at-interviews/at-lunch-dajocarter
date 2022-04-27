import styles from './index.module.scss'

function CardList ({ isListView }: { isListView: boolean }) {
  return (
    <div className={`${styles['container']} ${isListView ? styles['inView'] : styles['outView']}`}>
      Restaurant cards will go here
    </div>
  )
}

export default CardList