import { useState } from 'react'
import ExerciseList from './components/ExerciseList'
import benchpress from '../../assets/exercises/benchpress.png'
import bicepcurls from '../../assets/exercises/bicepcurls.png'
import hammercurls from '../../assets/exercises/hammercurls.png'
import inclinebenchpress from '../../assets/exercises/inclinebenchpress.png'
import legpress from '../../assets/exercises/legpress.png'
import pulldown from '../../assets/exercises/pulldown.png'
import pullup from '../../assets/exercises/pullup.png'
import skullcrushers from '../../assets/exercises/skullcrushers.png'
import squat from '../../assets/exercises/squat.png'
import triceppushdowns from '../../assets/exercises/triceppushdowns.png'
import styles from './Exercises.module.css'

export default function Exercises() {
 const exercisesList = [
    {
      id: crypto.randomUUID(),
      name: "Bicep Curls",
      video: "video_1",
      icon: bicepcurls,
    },
    {
      id: crypto.randomUUID(),
      name: "Hammer Curls",
      video: "video_2",
      icon: hammercurls,
    },
    {
      id: crypto.randomUUID(),
      name: "Tricep Pushdowns",
      video: "video_3",
      icon: triceppushdowns,
    },
    {
      id: crypto.randomUUID(),
      name: "Skull Crushers",
      video: "video_4",
      icon: skullcrushers,
    },
    {
      id: crypto.randomUUID(),
      name: "Bench Press",
      video: "video_5",
      icon: benchpress,
    },
    {
      id: crypto.randomUUID(),
      name: "Incline Dumbbell Press",
      video: "video_6",
      icon: inclinebenchpress,
    },
    {
      id: crypto.randomUUID(),
      name: "Pull Ups",
      video: "video_7",
      icon: pullup,
    },
    {
      id: crypto.randomUUID(),
      name: "Lat Pulldown",
      video: "video_8",
      icon: pulldown,
    },
    {
      id: crypto.randomUUID(),
      name: "Squats",
      video: "video_9",
      icon: squat,
    },
    {
      id: crypto.randomUUID(),
      name: "Leg Press",
      video: "video_10",
      icon: legpress,
  },
  ]


  const [exercises, setExercises] = useState(exercisesList)

  return (
    <>
      <header>
        <h1>All Exercises</h1>
      </header>

      <div className={styles["content-wrapper"]}>
        <section className={styles["filter-wrapper"]}>
          <h2 className={styles["filter-text"]}>Filter</h2>

          <div className={styles["filter-input-wrapper"]}>

            <div className={styles["filter-input-link"]}>
              <label htmlFor='search-exercise' />
              <input type="text" id="search-exercise" className={styles["search-exercise-input"]}/>
              
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
        </section>

        <section aria-label='Exercise List' className={styles["content-main"]}>

          <ExerciseList exercises={exercises}/>
        </section>
      </div>
    </>
  )
}