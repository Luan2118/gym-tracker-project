import { useState, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import TrainingSplitList from './components/TrainingSplitList'
import checkmark from '../../assets/training-split/checkmark.png'
import deleteWorkoutDayIcon from '../../assets/training-split/delete-workout-day.png'
import editIcon from '../../assets/training-split/edit.png'
import plusIcon from '../../assets/training-split/plus-icon.png'
import close from '../../assets/training-split/x-close.png'
import deleteExerciseIcon from '../../assets/training-split/x-delete.png'
import styles from './TrainingSplit.module.css'

export default function TrainingSplit() {

  const trainingSplitData = [
    {
      name: 'Upper Lower', id: crypto.randomUUID()
    }, 
    {
      name: 'PPL', id: crypto.randomUUID()
    }]
  
  const [trainingSplits, setTrainingSplits] = useState(trainingSplitData);
  const dialogRef = useRef(null); 
  const [workoutDays, setWorkoutDays] = useState([]);
  const { exercises, setExercises } = useOutletContext();
  const [searchExerciseText, setSearchExerciseText] = useState('');

  function openDialog() {
    dialogRef.current.showModal();
    
  }
  
  function closeDialog() {
    dialogRef.current.close();
  }

  function addWorkoutDay() {
    setWorkoutDays(prev => [
      ...prev,
      {name: '', id: crypto.randomUUID(), confirm: false, exercises: []}
    ])
  }

  function deleteWorkoutDay(id) {
    const newArray = workoutDays.filter((workoutDay) => workoutDay.id !== id)
    setWorkoutDays(newArray)
  }

  function handleWorkoutDayInputText(id, e) {
    const value = (e.target.value);

    setWorkoutDays(prev => 
      prev.map((workoutDay => {
        if (workoutDay.id === id) {
          return {
            ...workoutDay,
            name: value
          }
        }
        return workoutDay
      }))
    )
  }

  function confirmWorkoutDay(id) {

    setWorkoutDays(prev => 
      prev.map((workoutDay) => {
        
        if (workoutDay.id !== id) return workoutDay;

        if(workoutDay.name.trim().length === 0) return workoutDay

        return {
          ...workoutDay,
          confirm: !workoutDay.confirm
        }
      })
    )
  }

  function addExercise(id) {
    setWorkoutDays((prev) => 
      prev.map((workoutDay) => {
        if (workoutDay.id !== id) return workoutDay;

        return {
          ...workoutDay,
          exercises: [
            ...workoutDay.exercises,
            {
            exercise: '', id: crypto.randomUUID(), sets: 0, reps: []
          }]
        }
    }))

  }

  console.log(workoutDays)

  function deleteExercise(workoutDayId, excerciseId) {
    setWorkoutDays((prev) => 
      prev.map((workoutday) => {
        if (workoutDayId !== workoutday.id) return workoutday;

        const result = workoutday.exercises.filter((ex) => ex.id !== excerciseId)

        return {
          ...workoutday,
          exercises: result
        }
      })

    )
  }

  return (
    <>
      <header>
        <h1>Training Split</h1>
      </header>

      <div className={styles["content-wrapper"]}>

        <div className={styles["add-training-wrapper"]}>
          <button className={styles["add-training-button"]} onClick={openDialog}>Add Training Split</button>
        </div>

        <dialog ref={dialogRef} className={styles["add-training-split-dialog"]}>
          <div>

            <div className={styles["training-split-name-wrapper"]}>
              <label htmlFor="training-split-name"></label>
              <input type="text"  id="training-split-name" placeholder='Training Split Name' className={styles["training-split-name-input"]}/>

              <button className={styles["add-workout-button"]} onClick={addWorkoutDay}>Add a Workout</button>

              <button className={styles["close-dialog-button"]} aria-label='Close dialog' onClick={closeDialog} ref={dialogRef}>
                <img className={styles["close-dialog-img"]} src={close} alt=''/>
              </button>
            </div>

            <hr aria-hidden="true"/>

            {workoutDays.map((workoutDay) => {
              return (
                  <div key={workoutDay.id}>
                    <div className={styles["workout-day-wrapper"]} >
                      {
                        workoutDay.confirm ?
                        <div className={styles["workout-day-name-text"]}>{workoutDay.name}</div> :
                        <>
                          <label htmlFor={workoutDay.id} className={styles["sr-only"]}>Workout day</label>
                          <input type="text" id={workoutDay.id} placeholder='Upper, Push, Legs' className={styles["workout-day-input"]} onChange={(e) => handleWorkoutDayInputText(workoutDay.id, e)} value={workoutDay.name}/> 
                        </>
                      }
          
                    
                      
                      <button className={styles["workout-day-button"]} aria-label='Confirm Workout Day' onClick={() => confirmWorkoutDay(workoutDay.id)}  disabled={workoutDay.name.trim().length === 0 ? true : false}>
                        {workoutDay.confirm ? <img className={styles["edit-icon"]}  src={editIcon} alt=''/> : <img className={styles["checkmark-icon"]}  src={checkmark} alt=''/>}
                      </button> 

                      <button className={styles["delete-workout-day-button"]} aria-label='Delete Workout Day' onClick={() => deleteWorkoutDay(workoutDay.id)}>
                        <img className={styles["delete-workout-day-icon"]}  src={deleteWorkoutDayIcon} alt=''/>
                      </button>
                    </div>

                    {workoutDay.exercises.map((ex) => {
                      return (
                        <div key={ex.id} className={styles["search-exercise-wrapper"]}>

                          <div className={styles["search-exercise-input-wrapper"]}>
                            <label htmlFor={ex.id} className={styles["sr-only"]}>Search exercise</label>
                            <input className={styles["search-exercise-input"]} type="text" id={ex.id} placeholder='Search exercise' onChange={(e) => setSearchExerciseText(e.target.value)} />
                            
                            <button className={styles["search-exercise-delete-button"]} aria-label='Delete Exercise' onClick={() => deleteExercise(workoutDay.id, ex.id)} >
                              <img className={styles["search-exercise-delete-icon"]}  src={deleteExerciseIcon} alt=''/>
                            </button>
                          </div>

                          <ul className={styles["search-exercise-list-wrapper"]}>
                            {
                              exercises.filter((exercise) => exercise.name.toLowerCase().includes(searchExerciseText.toLowerCase()))
                              .map((ex) => {
                                if(searchExerciseText.length === 0) return;
                                return (
                                  <li key={ex.id} className={styles["search-exercise-list"]}>
                                    <button className={styles["search-exercise-list-button"]}>
                                      <img className={styles["search-exercise-icon"]} src={ex.icon} />
                                      <span className={styles["search-exercise-name"]}>{ex.name}</span>
                                    </button>
                                  </li>
                                )
                              })
                            }
                          </ul>


                        </div>  
                      )
                    })}

                    <button className={styles["add-exercise-button"]} aria-label='Add exercise' onClick={() => addExercise(workoutDay.id)}>
                      <img className={styles["add-exercise-icon"]}  src={plusIcon} alt=''/>
                    </button>

                  </div>
              )
            })}


          </div>
        </dialog>

        <section className={styles["content-main"]}>
          <h2 className={styles["all-training-splits"]}>All Training Splits</h2>

          <hr />

        
          <TrainingSplitList  trainingSplits={trainingSplits}/>
            
        </section>


      </div>
    </>
  )
}