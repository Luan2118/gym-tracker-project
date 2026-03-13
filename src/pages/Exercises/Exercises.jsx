import ExerciseList from './components/ExerciseList'
import styles from './Exercises.module.css'
import searchIcon from '../../assets/searchIcon.png'
import { exercises } from '../../data/exercises'
import { useState } from 'react'

export default function Exercises() {

  const [searchText, setSearchText] = useState('');
  const [selectedMuscleOption, setSelectedMuscleOption] = useState('');

  const filteredExercises = 
  searchText ? exercises.filter((ex) => ex.name.toLowerCase().includes(searchText)) :
  selectedMuscleOption ? exercises.filter((ex) => {
    if (selectedMuscleOption.toLocaleLowerCase() === 'all muscles') {
      return ex;
    }else {
      return ex.muscleGroup === selectedMuscleOption
    }
  })
  :
  exercises
  
  const muscleGroupList = [];

  const filteredMuscleGroupEx = exercises.forEach((e) => {
    if (!muscleGroupList.includes(e.muscleGroup)) muscleGroupList.push(e.muscleGroup);
  })

  console.log(muscleGroupList)
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
            <section className={styles["filter-input-wrapper"]}>
              <h2 className={styles["sr-only"]}>Filter</h2>
              
              <div className={styles["filter-search-wrapper"]}>
                <label htmlFor='search-exercise' />
                <img src={searchIcon} alt="" className={styles["search-icon"]}/>
                <input type="text" id="search-exercise" className={styles["search-exercise-input"]} onChange={(e) => setSearchText(e.target.value.toLowerCase())} value={searchText} placeholder='Search...'/>
              </div>


                <label htmlFor="exercise-category" className={styles["sr-only"]}>Category</label>
                <select id="exercise-category" className={styles["exercise-category-select"]} onChange={(e) => setSelectedMuscleOption(e.target.value)} value={selectedMuscleOption}>
                  <option value="All Muscles">All Muscles</option>
                  {
                    muscleGroupList.map((muscleGroup) => {
                      return (
                        <option value={muscleGroup} key={muscleGroup}>
                          {muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1)}
                          </option>
                      )
                    })
                  }
                </select>
                
                <label htmlFor="equipment-category" className={styles["sr-only"]}>Category</label>
                <select id="equipment-category" className={styles["equipment-category-select"]}>
                  <option value="All Equipment">All Equipment</option>
                </select>

              <div className={styles["filter-upper-lower-wrapper"]}>
                <button className={styles["upper-body-exercises"]}>Upper Body Exercises</button>
                <button className={styles["lower-body-exercises"]}>Lower Body Exercises</button>
              </div>

            </section>
          <section aria-label='Exercise List' className={styles["exercise-list-wrapper"]}>
            <ExerciseList filteredExercises={filteredExercises}/>
          </section>
        </div>
      </div>
    </>
  )
}