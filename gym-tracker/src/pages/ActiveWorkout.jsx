import styles from  './ActiveWorkout.module.css'

export default function ActiveWorkout() {
  return (
    <>
    <header>
      <h1>Active Workout</h1>
    </header>


    <div className={styles["content-wrapper"]}>

      <section className={styles["content-header"]}>
        <button className={styles["start-workout-button"]}>
          Start  Workout
        </button>
      </section>

      
      <section className={styles["content-main"]}>
        <h2>No Active Workout</h2>
      </section>
    </div>
    </>


  )
}