import styles from './WorkoutHistoryItem.module.css'
import arrowDown from '../../../assets/workout-history/arrow-down.png'
import formatISODate from '../../../utils/formatISODate';
import { useState } from 'react';
import { EXERCISE_BASE_PREFIX } from '../../../data/exercises';
import ExerciseSetsStat from '../../../components/Exercises/ExerciseSetsStat';


export default function WorkoutHistoryItem({ workoutHistory, filteredWorkoutHistory }) {

  const [selectedWorkoutHisId, setSelectedWorkoutHisId] = useState('');

  const selectedWorkoutHistItem = filteredWorkoutHistory.find((w) => w.id === selectedWorkoutHisId)

  // ex, exerciseId, workoutHistory, activeExIds, lastWorkout

  console.log(selectedWorkoutHistItem)

  const activeExIds = new Set(selectedWorkoutHistItem?.exercises.map(e => e.exerciseId));


  const lastWorkout = [...workoutHistory]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .find(w => w.exercises?.some(ex => activeExIds.has(ex.exerciseId)));



  function displaySelectedWorkoutHist(workoutId) {
    if (selectedWorkoutHisId === workoutId) setSelectedWorkoutHisId('')
    else setSelectedWorkoutHisId(workoutId)
  }

  return (
    filteredWorkoutHistory.map((workout) => {
      return (
        <div key={workout.id} className={styles["workout-history-item-wrapper"]}>
          <button className={styles["workout-history-item-button"]} onClick={() => displaySelectedWorkoutHist(workout.id)}>
            <div className={styles["workout-history-item-names"]}>
              <span className={styles["workout-history-item-training-split-text"]}>Split: {workout.trainingSplitName}</span>

              <span className={styles["workout-history-item-workout-day-text"]}>Workout Day: {workout.workoutDay}</span>

              <span className={styles["workout-history-item-day-text"]}>Date: {formatISODate(workout.date)}</span>
            </div>

            <img src={arrowDown} alt="" className={workout.id === selectedWorkoutHisId ? styles["arrow-up-icon"] : styles["arrow-down-icon"]} />
          </button>

          {workout.id === selectedWorkoutHisId ?
            <div className={styles["selected-workout-history-wrapper"]}>
              {selectedWorkoutHistItem.exercises.map((ex) => {
                return (
                  <div key={ex.exerciseId} className={styles["selected-workout-history-exercise-row"]}>
                    <div className={styles["selected-workout-history-left"]}>
                      <img
                        src={`${EXERCISE_BASE_PREFIX}${ex.images[0]}`}
                        alt=""
                        className={styles["selected-workout-history-ex-icon"]}
                      />

                      <div className={styles["selected-workout-history-ex-name"]}>
                        {ex.exerciseName}
                      </div>
                    </div>

                    <div className={styles["selected-workout-history-sets-column"]}>
                      {ex.sets.map((set, i) => {
                        return (
                          <div key={set.id} className={styles["selected-workout-history-set-pill"]}>
                            <span className={styles["selected-workout-history-set-label"]}>
                              Set {i + 1}:
                            </span>
                            <span className={styles["selected-workout-history-set-value"]}>
                              {set.weight} × {set.reps}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              }
              )}
            </div>
            : ''}
        </div>
      )
    })
  )
}

