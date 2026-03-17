import styles from './BodyWeightItem.module.css'
import formatISODate from '../../../utils/formatISODate'

export default function BodyWeightItem({bodyWeights, deleteBodyWeight}) {
  return (
    <>
      {bodyWeights.map((bodyweight) => {
        return (
          <li key={bodyweight.id} className={styles['body-weight-item-wrapper']}>

            <div className={styles['body-weight-data-wrapper']}>
              <div className={styles['body-weight-date']}>
                {formatISODate(bodyweight.date)}
              </div>
              <span className={styles['seperator']}>
                :
              </span>
              <div className={styles['body-weight']}>
                {bodyweight.bw} kg
              </div>
            </div>

            <div>
              <button type='button' className={styles['body-weight-edit-button']}>Edit</button>
              <button type='button' className={styles['body-weight-delete-button']} onClick={() => deleteBodyWeight(bodyweight.id)}>Delete</button>
            </div>
          </li>
        )
      })}
    </>
  )
}