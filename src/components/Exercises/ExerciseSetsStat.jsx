import styles from './ExerciseSetsStat.module.css'
import { getBestSet, getPrevSet } from '../../utils/WorkoutSetHelpers'
import {EXERCISE_BASE_PREFIX} from '../../data/exercises'


export default function ExerciseSetsStat({ ex, exerciseId, workoutHistory, activeExIds, lastWorkout }) {


  return (
    <>
      <div className={styles["active-workout-name-wrapper"]}>
        <img src={`${EXERCISE_BASE_PREFIX}${ex.images[0]}`} alt="" className={styles["active-workout-ex-icon"]} />
        <div className={styles["active-workout-ex-name"]}>{ex.exerciseName}</div>
      </div>

      <div>
        <div className={styles["active-workout-best-set-title"]}> Best set:</div>
        {ex.sets.map((set, index) => {

          const bestSet = getBestSet(exerciseId, set.id, activeExIds, workoutHistory)

          return (
            <div key={set.id} className={styles["active-workout-b-p-set-wrapper"]}>
              <div className={styles["active-workout-b-p-set"]}>Set {index + 1}:</div>
              {bestSet ? `${bestSet.weight} x ${bestSet.reps}` : "-"}
            </div>
          )
        })}
      </div>

      <div>
        <div className={styles["active-workout-previous-set-title"]}>Previous set:</div>
        {ex.sets.map((set, index) => {
          const prevSet = getPrevSet(exerciseId, set.id, lastWorkout)
          return (
            <div key={set.id} className={styles["active-workout-b-p-set-wrapper"]}>
              <div className={styles["active-workout-b-p-set"]}>Set {index + 1}:</div>
              {prevSet ? `${prevSet.weight} x ${prevSet.reps}` : "-"}
            </div>
          )
        })}
      </div>
    </>
  )
}