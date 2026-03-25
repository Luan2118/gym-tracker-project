import styles from './ExerciseSetsStat.module.css'
import { getBestSet, getPrevSet } from '../../utils/WorkoutSetHelpers'
import { EXERCISE_BASE_PREFIX } from '../../data/exercises'


export default function ExerciseSetsStat({ ex, exerciseId, workoutHistory, activeExIds, lastWorkout }) {


  return (
    <div className={styles["active-workout-wrapper-outer"]}>
      <div className={styles["active-workout-name-wrapper"]}>
        <img src={`${EXERCISE_BASE_PREFIX}${ex.images[0]}`} alt="" className={styles["active-workout-ex-icon"]} />
        <div className={styles["active-workout-ex-name"]}>{ex.exerciseName}</div>
      </div>

      <div className={styles["active-workout-best-previous-set-wrapper"]}>
        <div className={styles["active-workout-best-set-wrapper"]}>
          <div className={styles["active-workout-best-set-title"]}> Best set</div>
          {ex.sets.map((set, index) => {

            const bestSet = getBestSet(exerciseId, set.id, activeExIds, workoutHistory)

            return (
              <div key={set.id} className={styles["active-workout-b-p-set-wrapper"]}>
                <div className={styles["active-workout-b-p-set"]}>Set {index + 1}:</div>
                <span className={styles["active-workout-b-p-set-value"]}>{bestSet ? `${bestSet.weight} × ${bestSet.reps}` : "-"}</span>
              </div>
            )
          })}
        </div>

        <div className={styles["active-workout-wrapper-previous-set-wrapper"]}>
          <div className={styles["active-workout-previous-set-title"]}>Previous set</div>
          {ex.sets.map((set, index) => {
            const prevSet = getPrevSet(exerciseId, set.id, lastWorkout)
            return (
              <div key={set.id} className={styles["active-workout-b-p-set-wrapper"]}>
                <div className={styles["active-workout-b-p-set"]}>Set {index + 1}:</div>
                <span className={styles["active-workout-b-p-set-value"]}>{prevSet ? `${prevSet.weight} × ${prevSet.reps}` : "-"}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}