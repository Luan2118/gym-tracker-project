import ExerciseSetsStat from '../../components/Exercises/ExerciseSetsStat';
import styles from './WorkoutHistory.module.css'
import { useOutletContext } from 'react-router-dom'

export default function WorkoutHistory() {

  const { workoutHistory, setWorkoutHistory } = useOutletContext();

  const sortedWorkouts = [...workoutHistory].sort((a, b) => new Date(b.date) - new Date(a.date))
   const lastWorkout = sortedWorkouts[0];
   const activeExIds = new Set(lastWorkout?.exercises.map(e => e.exerciseId));

  return (
    <>
      <header>
        <h1>Workout History</h1>
      </header>

      <div className={styles["content-wrapper"]}>
        <section className={styles["section-wrapper"]}>
          <h2>Last Workout</h2>

          <div className={styles["last-workout-header"]}>
            <div className={styles["last-workout-split"]}>Split: {lastWorkout?.trainingSplitName}</div>
            <div className={styles["last-workout-workout-day"]}>Workout Day: {lastWorkout?.workoutDay}</div>
            <div className={styles["last-workout-date"]}>Date: {lastWorkout?.date}</div>
          </div>

          {lastWorkout?.exercises.map((ex) => {
            return (
              <div key={ex.exerciseId}>
                <div className={styles["active-workout-wrapper"]}>
                  <ExerciseSetsStat 
                    ex={ex}
                    exerciseId={ex.exerciseId}
                    workoutHistory={workoutHistory}
                    activeExIds={activeExIds}
                    lastWorkout={lastWorkout}
                  />
                </div>
              </div>

            )
          })}
        </section>

        <section className={styles["section-wrapper"]}>
          <h2>
            All Workouts
          </h2>

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
        </section>
      </div>
    </>
  )
}