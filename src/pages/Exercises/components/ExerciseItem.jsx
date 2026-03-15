import styles from './ExerciseItem.module.css'
import { EXERCISE_BASE_PREFIX } from '../../../data/exercises'

export default function ExerciseItem({filteredExercises}) {
  return (
    <>
      {filteredExercises.map((exercise) => {
        return (
          <button key={exercise.id} className={styles["exercise-item-wrapper"]} >
            <img src={`${EXERCISE_BASE_PREFIX}${exercise.images[0]}`} alt='' aria-hidden="true" className={styles["exercise-item-img"]}/>
            <div className={styles["exercise-item-name"]} id="exercise-name">{exercise.name}</div>
          </button>
        )
      })}
    </>
  )
}