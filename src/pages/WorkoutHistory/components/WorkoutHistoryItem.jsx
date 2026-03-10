import styles from './WorkoutHistoryItem.module.css'
import arrowDown from '../../../assets/workout-history/arrow-down.png'


export default function WorkoutHistoryItem({ workoutHistory }) {
  return (
    workoutHistory.map((workout) => {
      return (
        <button className={styles["workout-history-button"]} key={workout.id}>
          <span className={styles["workout-history-names"]}>
            <span className={styles["workout-history-training-split-text"]}>Split: {workout.trainingSplitName}</span>

            <hr className={styles["verticalLine"]} />
            <span className={styles["workout-history-workout-day-text"]}>Workout Day: {workout.workoutDay}</span>

            <hr className={styles["verticalLine"]} />
            <span className={styles["workout-history-day-text"]}>Date: {workout.date}</span>
          </span>

          <img src={arrowDown} alt="" className={styles["arrow-down-icon"]} />
        </button>
      )
    })
  )
}