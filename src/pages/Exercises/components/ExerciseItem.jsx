import styles from './ExerciseItem.module.css'

export default function ExerciseItem({exercises}) {
  return (
    <>
      {exercises.map((exercise) => {
        return (
          <button key={exercise.id} className={styles["exercise-item-wrapper"]} >
            <img src={exercise.icon} alt='' aria-hidden="true" className={styles["exercise-item-img"]}/>
            <div className={styles["exercise-item-name"]} id="exercise-name">{exercise.name}</div>
          </button>
        )
      })}
    </>
  )
}