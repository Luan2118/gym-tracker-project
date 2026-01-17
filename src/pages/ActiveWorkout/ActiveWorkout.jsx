import styles from  './ActiveWorkout.module.css'

export default function ActiveWorkout() {



  return (
    <>
    <header>
      <h1>Active Workout</h1>
    </header>


    <div className={styles["content-wrapper"]}>

      <div className={styles["start-workout-wrapper"]}>
        <button type='button' className={styles["start-workout-button"]}>
          Start a Workout
        </button>

        <form className={styles["form-wrapper"]}>
          <label htmlFor="training-split" className={styles["training-split-text"]}>Training Split: </label>
          <select id="training-split" className={styles["select-input"]}>
            <option  id="" selected disabled>Select a Split</option>
            <option value="Upper/Lower"  className={styles["select-option"]}>Upper / Lower</option>
            <option value="PPL">PPL</option>
            <option value="Fullbody">Fullbody</option>
          </select>
        </form>
      </div>

      <section className={styles["content-main"]}>
        <h2>No Active Workout</h2>
      </section>
    </div>
    </>


  )
}