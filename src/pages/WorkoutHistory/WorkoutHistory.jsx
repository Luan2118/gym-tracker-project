import styles from './WorkoutHistory.module.css'
import { useOutletContext } from 'react-router-dom'
import WorkoutHistoryItem from './components/WorkoutHistoryItem';

export default function WorkoutHistory() {

  const { workoutHistory, setWorkoutHistory } = useOutletContext();

  return (
    <>
      <header>
        <h1>Workout History</h1>
      </header>

      <div className={styles["section-wrapper"]}>
        <section className={styles["filter-wrapper"]}>
          <h3 className={styles["sr-only"]}>Filter</h3>

          <div>
            <label htmlFor="search"></label>
            <input className={styles["search-input"]} id="search" placeholder='Search workout' type='text'></input>

            <label htmlFor="training-split" className={styles["sr-only"]}>Training Split</label>
            <select id="training-split" className={styles["filter-input"]}>
              <option value="Training Split">Training Split</option>
            </select>

            <label htmlFor="workout-day" className={styles["sr-only"]}>Workout Day</label>
            <select id="workout-day" className={styles["filter-input"]}>
              <option value="Workout Day">Workout Day</option>
            </select>

            <label htmlFor="sort" className={styles["sr-only"]}>Sort</label>
            <select id="sort" className={styles["filter-input"]}>
              <option value="Sort">Sort</option>
            </select>

          </div>
        </section>

        <div className={styles["content-main"]}>
          <WorkoutHistoryItem
            workoutHistory={workoutHistory}

          />

        </div>
      </div>
    </>
  )
}