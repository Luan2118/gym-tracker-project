import ExerciseList from './components/ExerciseList'
import styles from './Exercises.module.css'
import searchIcon from '../../assets/searchIcon.png'
import { exercises, EXERCISE_BASE_PREFIX } from '../../data/exercises'
import { useState } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title);


export default function Exercises() {

  const [searchText, setSearchText] = useState('');
  const [selectedMuscleOption, setSelectedMuscleOption] = useState('');
  const [selectedUpperBodyEx, setSelectedUpperBodyEx] = useState(false);
  const [selectedLowerBodyEx, setSelectedLowerBodyEx] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [clickedExImg, setClickedExImg] = useState(false);

  const selectedExercise = selectedExerciseId ? exercises.find((ex) => ex.id === selectedExerciseId) : '';

  const primaryMuscle = selectedExercise ? selectedExercise.primaryMuscles.map((muscle) => {
    return muscle.charAt(0).toUpperCase() + muscle.slice(1)
  }) : '';

  const secondaryMuscles = selectedExercise ?
    selectedExercise.secondaryMuscles.map((muscle) => {
      return muscle.charAt(0).toUpperCase() + muscle.slice(1)
    }) : ''


  const filteredExercises =
    searchText ? exercises.filter((ex) => ex.name.toLowerCase().includes(searchText)) :
      selectedMuscleOption ? exercises.filter((ex) => {
        if (selectedMuscleOption.toLocaleLowerCase() === 'all muscles') {
          return ex;
        } else {
          return ex.muscleGroup === selectedMuscleOption
        }
      }) :
        selectedUpperBodyEx ? exercises.filter((ex) => ex.bodyRegion === 'upper') :
          selectedLowerBodyEx ? exercises.filter((ex) => ex.bodyRegion === 'lower')
            :
            exercises

  const muscleGroupList = [];


  function handleSelectExercise(exerciseId) {
    setSelectedExerciseId(exerciseId)
  }

  return (
    <div className={styles["exercise-page"]}>
      <header>
        <h1>Exercise</h1>
      </header>

      <div className={styles["content-wrapper"]}>

        <div className={styles["main-content-wrapper"]}>
          {selectedExerciseId ?
            <>
              <div className={styles["selected-exercise-wrapper"]}>
                <div className={styles["selected-exercise-info"]}>
                  <div className={styles["selected-exercise-name"]}>{selectedExercise.name}</div>
                  <div className={styles["selected-exercise-primary-muscle"]}> Primary Muscle: {primaryMuscle}</div>
                  {secondaryMuscles.length > 0 ?
                    <div className={styles["selected-exercise-secondary-muscle"]}>
                      Secondary Muscles:{' '}
                      {secondaryMuscles.join(', ')}
                    </div> :
                    ''
                  }
                </div>
                <div>

                  <button onClick={() => setClickedExImg((prev) => !prev)} className={styles["selected-exercise-image-button"]}>
                    <img src={`${EXERCISE_BASE_PREFIX}${clickedExImg ? selectedExercise.images[0] : selectedExercise.images[1]}`} alt={selectedExercise.name} className={styles["selected-exercise-image"]} />
                  </button>
                </div>
              </div>

              <div className={styles["selected-exercise-statistics-wrapper"]}>
                <div>
                  <button className={styles["selected-exercise-statistics-progress-button"]}>Progress</button>
                  <button className={styles["selected-exercise-statistics-history-button"]}>History</button>
                </div>

                <hr className={styles["selected-exercise-statistics-hr"]} />
                
                  <Line
                    data={{
                      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                      datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                      }]
                    }}
                  />
              </div>
            </>
            :
            ''}

        </div>

        <div className={styles["filter-exercises-wrapper"]}>
          <section className={styles["filter-input-wrapper"]}>
            <h2 className={styles["sr-only"]}>Filter</h2>

            <div className={styles["filter-search-wrapper"]}>
              <label htmlFor='search-exercise' />
              <img src={searchIcon} alt="" className={styles["search-icon"]} />
              <input type="text" id="search-exercise" className={styles["search-exercise-input"]} onChange={(e) => setSearchText(e.target.value.toLowerCase())} value={searchText} placeholder='Search...' />
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
              <button className={selectedUpperBodyEx ? styles["clicked-filter-button"] : styles["upper-body-exercises"]} onClick={() => setSelectedUpperBodyEx((prev) => !prev)}>Upper Body Exercises</button>
              <button className={selectedLowerBodyEx ? styles["clicked-filter-button"] : styles["lower-body-exercises"]} onClick={() => setSelectedLowerBodyEx((prev) => !prev)}>Lower Body Exercises</button>
            </div>

          </section>
          <section aria-label='Exercise List' className={styles["exercise-list-wrapper"]}>
            <ExerciseList filteredExercises={filteredExercises} handleSelectExercise={handleSelectExercise} />
          </section>
        </div>
      </div>
    </div>
  )
}