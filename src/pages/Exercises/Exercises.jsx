import ExerciseList from './components/ExerciseList'
import styles from './Exercises.module.css'

export default function Exercises() {


  return (
    <>
      <header>
        <h1>Exercise</h1>
      </header>

      <div className={styles["content-wrapper"]}>

        <div className={styles["main-content-wrapper"]}>
          MAIN CONTENT
        </div>

        <div>
          <div className={styles["filter-wrapper"]}>
            <div className={styles["filter-input-wrapper"]}>

              <div className={styles["filter-input-link"]}>
                <label htmlFor='search-exercise' />
                <input type="text" id="search-exercise" className={styles["search-exercise-input"]} />

                <button className={styles["search-exercise-button"]}>Search</button>
              </div>

              <div className={styles["filter-input-link"]}>

                <label htmlFor="exercise-category" className={styles["by-muscle-category-label"]}>Category</label>
                <select id="exercise-category" className={styles["by-muscle-category-input"]}></select>


              </div>

              <div className={styles["filter-input-link"]}>
                <button className={styles["all-exercises"]}>All exercises</button>
                <button className={styles["by-muscle-group-filter"]}>By Muscle Group</button>
              </div>

              <div className={styles["filter-input-link"]}>
                <button className={styles["upper-body-exercises"]}>Upper Body Exercises</button>
                <button className={styles["lower-body-exercises"]}>Lower Body Exercises</button>
              </div>

            </div>
          </div>

          <section aria-label='Exercise List' className={styles["exercise-list-wrapper"]}>
            <ExerciseList />
          </section>
        </div>
      </div>
    </>
  )
}