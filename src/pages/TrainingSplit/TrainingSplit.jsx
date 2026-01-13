import { useState, useRef, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import TrainingSplitList from './components/TrainingSplitList'
import checkmark from '../../assets/training-split/checkmark.png'
import deleteWorkoutDayIcon from '../../assets/training-split/delete-workout-day.png'
import editIcon from '../../assets/training-split/edit.png'
import plusIcon from '../../assets/training-split/plus-icon.png'
import deleteSetIcon from '../../assets/training-split/deleteSet.png'
import close from '../../assets/training-split/x-close.png'
import deleteExerciseIcon from '../../assets/training-split/x-delete.png'
import styles from './TrainingSplit.module.css'

export default function TrainingSplit() {

  const [trainingSplits, setTrainingSplits] = useState(() => {
    const stored = localStorage.getItem('trainingSplits');

    return stored ? JSON.parse(stored) : []
  });

  const [trainingSplitInputText, setTrainingSplitInputText] = useState('')
  const dialogRef = useRef(null); 
  const [workoutDays, setWorkoutDays] = useState([]);
  const { exercises, setExercises } = useOutletContext();

  useEffect(() => {
    localStorage.setItem('trainingSplits', JSON.stringify(trainingSplits));
  }, [trainingSplits])

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

  function addExercise(id) {
    setWorkoutDays((prev) => 
      prev.map((workoutDay) => {
        if (workoutDay.id !== id) return workoutDay;

        return {
          ...workoutDay,
          exercises: [
            ...workoutDay.exercises,
            {
            exerciseName: '', rowId: crypto.randomUUID(), exerciseId:'', sets: [], confirm: false, searchText: '', icon: ''
          }]
        }
    }))
    
  }

  function handleSearchExerciseText(e, workoutDayID, addedExerciseRowId) {
    const value = e.target.value

    setWorkoutDays((prev) => 
      prev.map((workouday) => {
        if (workouday.id !== workoutDayID) return workouday;

        const newExercisesArray = workouday.exercises.map((exercise) => {
          if (exercise.rowId !== addedExerciseRowId) return exercise;

          return {
            ...exercise,
            searchText: value
          }
        })

        return {
          ...workouday,
          exercises : newExercisesArray
        }
      })
    )
  }


  function deleteExercise(workoutDayId, excerciseId) {
    setWorkoutDays((prev) => 
      prev.map((workoutday) => {
        if (workoutDayId !== workoutday.id) return workoutday;

        const newExercisesArray = workoutday.exercises.filter((ex) => ex.rowId !== excerciseId)

        return {
          ...workoutday,
          exercises: newExercisesArray
        }
      })

    )
  }

  function selectExercise(workoutDayID, selectedExerciseId, addedExerciseRowId) {
    const selectedExercise = exercises.find((exercise) => exercise.id === selectedExerciseId);
    
    setWorkoutDays((prev) => 
      prev.map((workoutday) => {
        if (workoutday.id !== workoutDayID) return workoutday;
        
        const newExercisesArray = workoutday.exercises.map((ex) => {
          if (ex.rowId !== addedExerciseRowId) return ex
          
          return {
            ...ex,
            exerciseName: selectedExercise.name,
            exerciseId : selectedExercise.id,
            icon: selectedExercise.icon,
            confirm: true
          }
        })
        
        return {
          ...workoutday,
          exercises: newExercisesArray
        }
      })
    )
    
  }

  function selectExerciseAgain(rowId, workoutdayId) {
    setWorkoutDays((prev) => 
      prev.map((workoutday) => {
        if (workoutday.id !== workoutdayId) return workoutday;

        const newExercisesArray = workoutday.exercises.map((ex) => {
          if (ex.rowId !== rowId) return ex;

          return {
            ...ex,
            exerciseName: '',
            searchText: '',
            exerciseId: '',
            confirm: false
          }
        })

        return {
          ...workoutday,
          exercises: newExercisesArray
        }
      })
    )
  }

  function addSet(workoutdayId, addedExerciseRowId) {

    setWorkoutDays((prev) => 
      prev.map((workoutday) => {
      if (workoutday.id !== workoutdayId) return workoutday;

      const newExercisesArray = workoutday.exercises.map((ex) => {
        if (ex.rowId !== addedExerciseRowId) return ex;

        

        return {
          ...ex,
          sets: [
            ...ex.sets,
            {id: crypto.randomUUID(), reps: '', weight: ''}
          ]
        }
      })

      return {
        ...workoutday,
        exercises : newExercisesArray
      }
    })
    )
  }

  function deleteSet(setId) {

    setWorkoutDays((prev) =>
      prev.map((workouday) => {

      const exercisesArray = workouday.exercises.map((ex) => {
        const newSetArray = ex.sets.filter((set) => set.id !== setId)
        
        return {
          ...ex,
          sets: newSetArray
        }
      })

      return {
        ...workouday,
        exercises: exercisesArray
      }

    })
    )
  }

  function submitTrainingSplit(e) {
    e.preventDefault()
    
    const name = trainingSplitInputText.trim()

    if (!name) return;

    const snapshotWorkoutDays = structuredClone(workoutDays);
    
     setTrainingSplits((prev) => [
      ...prev,
      {name, id: crypto.randomUUID(), workoutDays: snapshotWorkoutDays}
    ])
    
    setWorkoutDays([]);
    setTrainingSplitInputText('');

    dialogRef.current.close()
  }
  
  console.log(localStorage.getItem('trainingSplits'))
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
          <form className={styles["form-wrapper"]} onSubmit={submitTrainingSplit}>
              <div className={styles["training-split-name-wrapper"]}>
                <label htmlFor="training-split-name"></label>
                <input type="text"  id="training-split-name" placeholder='Training Split Name' className={styles["training-split-name-input"]} onChange={(e) => setTrainingSplitInputText(e.target.value)} value={trainingSplitInputText}/>

                <button type='button' className={styles["add-workout-button"]} onClick={addWorkoutDay}>Add a Workout</button>

                <button type='button' className={styles["close-dialog-button"]} aria-label='Close dialog' onClick={closeDialog}>
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

                        <button type='button' className={styles["delete-workout-day-button"]} aria-label='Delete Workout Day' onClick={() => deleteWorkoutDay(workoutDay.id)}>
                          <img className={styles["delete-workout-day-icon"]}  src={deleteWorkoutDayIcon} alt=''/>
                        </button>
                      </div>

                      {workoutDay.exercises.map((addedExercise) => {
                        return (
                          <div key={addedExercise.rowId} className={styles["search-exercise-wrapper"]}>

                            <div className={styles["search-exercise-input-wrapper"]}>
                              {addedExercise.confirm ?
                                <button type='button' className={styles["added-exercise-button"]} onClick={() => selectExerciseAgain(addedExercise.rowId, workoutDay.id)}>
                                  <img className={styles["added-exercise-icon"]}  src={addedExercise.icon} alt="" />
                                  <span className={styles["added-exercise-name"]}>{addedExercise.exerciseName}</span>
                                </button> :
                              <>
                                <label htmlFor={addedExercise.rowId} className={styles["sr-only"]}>Search exercise</label>
                                <input className={styles["search-exercise-input"]} type="text" id={addedExercise.rowId} placeholder='Search exercise' onChange={(e)=> handleSearchExerciseText(e, workoutDay.id, addedExercise.rowId)} value={addedExercise.searchText}/>
                              </>
                              }
                              
                              <button type='button' className={styles["search-exercise-delete-button"]} aria-label='Delete Exercise' onClick={() => deleteExercise(workoutDay.id, addedExercise.rowId)} >
                                <img className={styles["search-exercise-delete-icon"]}  src={deleteExerciseIcon} alt=''/>
                              </button>
                            </div>
                            
                            {addedExercise.sets.map((set, index) => {
                              return (
                                <div key={set.id}  className={styles["set-wrapper"]}>
                                  <div>Set {index + 1}:</div>

                                  <div className={styles["reps-input-wrapper"]}>
                                    <input type="text"  className={styles["reps-input"]}/>
                                    x
                                    <input type="text"  className={styles["reps-input-2"]}/>
                                  </div>

                                  <button type='button' className={styles["delete-set-button"]} aria-label='Delete set' onClick={() => deleteSet(set.id)}>
                                    <img className={styles["delete-set-icon"]}  src={deleteSetIcon} alt=''/>
                                  </button>
                                </div>
                              )
                            })}
                            {addedExercise.confirm && <button type='button' className={styles["add-set-button"]} aria-label='Add set' onClick={() => addSet(workoutDay.id, addedExercise.rowId)}>
                              <img className={styles["add-set-icon"]}  src={plusIcon} alt=''/>
                              <span>Add set</span>
                            </button>}
                            
                            {addedExercise.confirm ?  '' :
                              <ul className={styles["search-exercise-list-wrapper"]}>
                                {
                                  exercises.filter((exercise) => exercise.name.toLowerCase().includes(addedExercise.searchText.toLowerCase()))
                                  .map((exer) => {
                                    if(addedExercise.searchText.length === 0) return;
                                    return (
                                      <li key={exer.id} className={styles["search-exercise-list"]}>
                                        <button type='button' className={styles["search-exercise-list-button"]} onClick={() => selectExercise(workoutDay.id, exer.id, addedExercise.rowId)}>
                                          <img className={styles["search-exercise-icon"]} src={exer.icon} />
                                          <span className={styles["search-exercise-name"]}>{exer.name}</span>
                                        </button>
                                      </li>
                                    )
                                  })
                                }
                              </ul>
                            }
                            


                          </div>  
                        )
                      })}

                      <button type='button' className={styles["add-exercise-button"]}  onClick={() => addExercise(workoutDay.id)}> <span className={styles["add-exercise-plus-symbol"]}>&#43;</span> Add exercise </button>

                    </div>
                )
              })}

                <button type='submit' className={styles["confirm-button"]} >Confirm</button>
          </form>
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