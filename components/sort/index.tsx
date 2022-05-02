import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './index.module.scss'

function SortButton ({ handleSort }: { handleSort: (arg0: string) => void }) {
  const [sortValue, setSortValue] = useState('')
  const [sortOpen, setSortOpen] = useState(false)

  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleSort(sortValue)
    setSortOpen(false)
  }

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    setSortValue(e.target.value)
  }

  return (
    <>
      <div className={styles.sortButtonContainer}>
        <button className={`${styles.sortButton} ${sortOpen ? styles.activeButton : styles.inactiveButton}`} onClick={() => setSortOpen(open => !open)}>Sort</button>
        <div className={`${styles.tooltipContainer} ${sortOpen ? styles.visibleTooltip : styles.hiddenTooltip}`}>
          <form className={styles.sortForm} onSubmit={handleSubmit}>
            <input
              type='radio'
              name='sort-by-ratings'
              id='high-low'
              value='DESC'
              checked={sortValue === 'DESC'}
              onChange={handleChange}
            />
            <label htmlFor='high-low'>Ratings: High to Low</label>
            <input
              type='radio'
              name='sort-by-ratings'
              id='low-high'
              value='ASC'
              checked={sortValue === 'ASC'}
              onChange={handleChange}
            />
            <label htmlFor='low-high'>Ratings: Low to High</label>
            <button type="submit" className={styles.applySort}>Apply</button>
          </form>
        </div>
      </div>
      <div className={`${styles.overlay} ${sortOpen ? styles.activeOverlay : styles.hiddenOverlay}`} />
    </>
  )
}

export default SortButton