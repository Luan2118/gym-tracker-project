  import styles from './ActiveExerciseCard.module.css'
import ExerciseSetsStat from '../../../components/Exercises/ExerciseSetsStat';

export default function ActiveExerciseCard({ ex, activeExercises, workoutHistory, handleWeightSet, handleRepsSet }) {

  const activeExIds = new Set(activeExercises.map(e => e.exerciseId));

  const lastWorkout = [...workoutHistory]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .find(w => w.exercises?.some(ex => activeExIds.has(ex.exerciseId)));


  return (
    <div className={styles["active-workout-wrapper"]}>
      <ExerciseSetsStat
        ex={ex}
        exerciseId={ex.exerciseId}
        workoutHistory={workoutHistory}
        activeExIds={activeExIds}
        lastWorkout={lastWorkout}
      />

      <div className={styles["active-workout-set-wrapper"]}>
        <div className={styles["active-workout-current-set-text"]}>Current set :</div>
        {ex.sets.map((set, index) => {
          return (
            <div key={set.id} className={styles["active-workout-set-wrapper"]}>
              <fieldset className={styles["fieldset-wrapper"]}>
                <legend className={styles["sr-only"]}>Set {index + 1}:</legend>

                <div className={styles["set-text"]}>Set {index + 1}:</div>

                <div className={styles["active-workout-set-input-wrapper"]}>
                  <label htmlFor={`weight-${set.id}`} className={styles["sr-only"]}>Weight</label>
                  <input type="number" id={`weight-${set.id}`} className={styles["active-workout-weight-input"]} onChange={(e) => handleWeightSet(e, set.id, ex.exerciseId)} />
                  x
                  <label htmlFor={`reps-${set.id}`} className={styles["sr-only"]}>Reps</label>
                  <input type="number" id={`reps-${set.id}`} className={styles["active-workout-reps-input"]} onChange={(e) => handleRepsSet(e, set.id, ex.exerciseId)} />
                </div>
              </fieldset>
            </div>
          )
        })}
      </div>
    </div>
  )
}