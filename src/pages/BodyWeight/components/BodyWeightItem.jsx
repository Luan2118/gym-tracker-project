import styles from './BodyWeightItem.module.css'

export default function BodyWeightItem() {
  return (
    <>
      <li className={styles['body-weight-item-wrapper']}>
        15.1.2026: 75.6 Kg
      </li>

      <li className={styles['body-weight-item-wrapper']}>
        16.1.2026: 85.7 Kg
      </li>

      <li className={styles['body-weight-item-wrapper']}>
        17.1.2026: 90 Kg
      </li>
    </>
  )
}