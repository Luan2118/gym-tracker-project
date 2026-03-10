import styles from './WorkoutHistoryItem.module.css'
import arrowDown from '../../../assets/workout-history/arrow-down.png'
import { useState } from 'react';
import ExerciseSetsStat from '../../../components/Exercises/ExerciseSetsStat';


export default function WorkoutHistoryItem({ workoutHistory }) {

  const [selectedWorkoutHisId, setSelectedWorkoutHisId] = useState('');
  const [selectedWorkoutHistory, setSelectedWorkoutHistory] = useState(false);

  const selectedWorkoutHistItem = workoutHistory.find((w) => w.id === selectedWorkoutHisId)

  // ex, exerciseId, workoutHistory, activeExIds, lastWorkout


  const activeExIds = new Set(selectedWorkoutHistItem?.exercises.map(e => e.exerciseId));


  const lastWorkout = [...workoutHistory]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .find(w => w.exercises?.some(ex => activeExIds.has(ex.exerciseId)));


  console.log(selectedWorkoutHistItem)

  function displaySelectedWorkoutHist(workoutId) {
    setSelectedWorkoutHisId(workoutId)
    setSelectedWorkoutHistory((prev) => !prev)
  }

  return (
    workoutHistory.map((workout) => {
      return (
        <div key={workout.id} className={styles["workout-history-item-wrapper"]}>
          <button className={styles["workout-history-item-button"]} onClick={() => displaySelectedWorkoutHist(workout.id)}>
            <span className={styles["workout-history-item-names"]}>
              <span className={styles["workout-history-item-training-split-text"]}>Split: {workout.trainingSplitName}</span>

              <hr className={styles["verticalLine"]} />
              <span className={styles["workout-history-item-workout-day-text"]}>Workout Day: {workout.workoutDay}</span>

              <hr className={styles["verticalLine"]} />
              <span className={styles["workout-history-item-day-text"]}>Date: {workout.date}</span>
            </span>

            <img src={arrowDown} alt="" className={styles["arrow-down-icon"]} />
          </button>

          {workout.id === selectedWorkoutHisId && selectedWorkoutHistory ?
            <div className={styles["selected-workout-history-wrapper"]}>
              {selectedWorkoutHistItem.exercises.map((ex) => {
                return (
                  <div key={ex.exerciseId} className={styles["selected-workout-history-exercise-wrapper"]}>
                    <ExerciseSetsStat
                      ex={ex}
                      exerciseId={ex.exerciseId}
                      workoutHistory={workoutHistory}
                      activeExIds={activeExIds}
                      lastWorkout={lastWorkout}
                    />
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