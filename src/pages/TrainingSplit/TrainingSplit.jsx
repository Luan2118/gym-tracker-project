import { useState, useRef, useEffect } from 'react'
import { exercises } from '../../data/exercises'
import TrainingSplitList from './components/TrainingSplitList'
import deleteWorkoutDayIcon from '../../assets/training-split/delete-workout-day.png'
import close from '../../assets/training-split/x-close.png'
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom'
import styles from './TrainingSplit.module.css'
import WorkoutDayExercise from './components/WorkoutDayExercise'

export default function TrainingSplit() {

  const { trainingSplits, setTrainingSplits } = useOutletContext();

  const [trainingSplitInputText, setTrainingSplitInputText] = useState('')
  const [workoutDays, setWorkoutDays] = useState([]);
  const [editingSplitId, setEditingSplitId] = useState(null);
  const dialogRef = useRef(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('dialog') === 'open') {
      dialogRef.current.showModal();
    }
  }, [searchParams])

  function openDialog() {
    setEditingSplitId(null);
    setTrainingSplitInputText('');
    setWorkoutDays([]);
    dialogRef.current.showModal();

  }

  function closeDialog() {
    console.log('')
    console.log(editingSplitId)
    console.log(trainingSplitInputText)
    console.log(workoutDays)
    setEditingSplitId(null);
    setTrainingSplitInputText('');
    setWorkoutDays([]);
    dialogRef.current.close();
    navigate('')
  }

  function addWorkoutDay() {
    setWorkoutDays(prev => [
      ...prev,
      { name: '', id: crypto.randomUUID(), confirm: false, exercises: [] }
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
              exerciseName: '', rowId: crypto.randomUUID(), exerciseId: '', sets: [], confirm: false, searchText: '', images: []
            }]
        }
      }))

  }

  function handleSearchExerciseText(e, workoutDayID, addedExerciseRowId) {
    const value = e.target.value

    setWorkoutDays((prev) =>
      prev.map((workoutday) => {
        if (workoutday.id !== workoutDayID) return workoutday;

        const newExercisesArray = workoutday.exercises.map((exercise) => {
          if (exercise.rowId !== addedExerciseRowId) return exercise;

          return {
            ...exercise,
            searchText: value
          }
        })

        return {
          ...workoutday,
          exercises: newExercisesArray
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
            exerciseId: selectedExercise.id,
            images: selectedExercise.images,
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
              { id: crypto.randomUUID(), reps: '', weight: '' }
            ],
          }
        })

        return {
          ...workoutday,
          exercises: newExercisesArray
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
    e.preventDefault();

    const name = trainingSplitInputText.trim();

    if (!name) return;

    const snapshotWorkoutDays = structuredClone(workoutDays);

    setTrainingSplits((prev) => {
      if (editingSplitId === null) {
        return [
          ...prev,
          { name, id: crypto.randomUUID(), workoutDays: snapshotWorkoutDays }
        ]
      }

      return prev.map((trainingSplit) => {
        if (trainingSplit.id !== editingSplitId) return trainingSplit;

        return {
          ...trainingSplit,
          name,
          workoutDays: snapshotWorkoutDays
        }
      })

    })

    closeDialog();
  }



  function editTrainingSplit(id) {
    const selectedSplit = trainingSplits.find((split) => split.id === id);
    if (!selectedSplit) return;
    const selectedSplitCopy = structuredClone(selectedSplit);

    setEditingSplitId(selectedSplitCopy.id);
    setWorkoutDays(selectedSplitCopy.workoutDays);
    setTrainingSplitInputText(selectedSplitCopy.name);


    dialogRef.current.showModal();
  }

  function deleteTrainingSplit(id) {
    setTrainingSplits((prev) => prev.filter((trainingsplit) => trainingsplit.id !== id))
  }

  function handleWeightSet(e, workoutDayId, addedExerciseRowId, setId) {
    const value = (e.target.value);

    const newArray = workoutDays.map((workoutday) => {
      if (workoutday.id !== workoutDayId) return workoutday;

      const newExerciseArray = workoutday.exercises.map((exercise) => {
        if (exercise.rowId !== addedExerciseRowId) return exercise;

        const newSetArray = exercise.sets.map((set) => {
          if (set.id !== setId) return set;

          return {
            ...set,
            weight: value
          }
        })

        return {
          ...exercise,
          sets: newSetArray
        }
      })

      return {
        ...workoutday,
        exercises: newExerciseArray
      }
    })

    setWorkoutDays(newArray);
  }

  function handleRepsSet(e, workoutDayId, addedExerciseRowId, setId) {
    const value = (e.target.value);

    const newArray = workoutDays.map((workoutday) => {
      if (workoutday.id !== workoutDayId) return workoutday;

      const newExerciseArray = workoutday.exercises.map((exercise) => {
        if (exercise.rowId !== addedExerciseRowId) return exercise;

        const newSetArray = exercise.sets.map((set) => {
          if (set.id !== setId) return set;

          return {
            ...set,
            reps: value
          }
        })

        return {
          ...exercise,
          sets: newSetArray
        }
      })

      return {
        ...workoutday,
        exercises: newExerciseArray
      }
    })

    setWorkoutDays(newArray);
  }

  return (
    <>
      <header>
        <h1>All Training Splits</h1>
      </header>

      <div className={styles["content-wrapper"]}>

        <dialog ref={dialogRef} className={styles["add-training-split-dialog"]}>
          <form className={styles["form-wrapper"]} onSubmit={submitTrainingSplit}>
            <div className={styles["training-split-name-wrapper"]}>
              <label htmlFor="training-split-name"></label>
              <input type="text" id="training-split-name" placeholder='Training Split Name' className={styles["training-split-name-input"]} onChange={(e) => setTrainingSplitInputText(e.target.value)} value={trainingSplitInputText} />

              <button type='button' className={styles["add-workout-button"]} onClick={addWorkoutDay}>Add Workout</button>

              <button type='button' className={styles["close-dialog-button"]} aria-label='Close dialog' onClick={closeDialog}>
                <img className={styles["close-dialog-img"]} src={close} alt='' />
              </button>
            </div>

            <hr aria-hidden="true" />

            {workoutDays.map((workoutDay) => {
              return (
                <div key={workoutDay.id} className={styles["workout-day-wrapper"]} >
                  <div className={styles["workout-day-inner-wrapper"]} >
                    {
                      workoutDay.confirm ?
                        <div className={styles["workout-day-name-text"]}>{workoutDay.name}</div> :
                        <>
                          <label htmlFor={workoutDay.id} className={styles["sr-only"]}>Workout day</label>
                          <input type="text" id={workoutDay.id} placeholder='Upper, Push, Legs' className={styles["workout-day-input"]} onChange={(e) => handleWorkoutDayInputText(workoutDay.id, e)} value={workoutDay.name} />
                        </>
                    }

                    <button type='button' className={styles["delete-workout-day-button"]} aria-label='Delete Workout Day' onClick={() => deleteWorkoutDay(workoutDay.id)}>
                      <img className={styles["delete-workout-day-icon"]} src={deleteWorkoutDayIcon} alt='' />
                    </button>
                  </div>

                  {workoutDay.exercises.map((addedExercise) =>
                    <WorkoutDayExercise
                      key={addedExercise.rowId}
                      addedExercise={addedExercise}
                      workoutDayId={workoutDay.id}
                      selectExerciseAgain={selectExerciseAgain}
                      handleSearchExerciseText={handleSearchExerciseText}
                      deleteExercise={deleteExercise}
                      handleWeightSet={handleWeightSet}
                      handleRepsSet={handleRepsSet}
                      deleteSet={deleteSet}
                      addSet={addSet}
                      selectExercise={selectExercise}
                    />
                  )}

                  <button type='button' className={styles["add-exercise-button"]} onClick={() => addExercise(workoutDay.id)}> <span className={styles["add-exercise-plus-symbol"]}>&#43;</span> Add exercise </button>

                </div>
              )
            })}

            <button type='submit' className={styles["confirm-button"]} >Confirm</button>
          </form>
        </dialog>

        <section className={styles["content-main"]}>

          <TrainingSplitList trainingSplits={trainingSplits.map((trainingsplit) => ({ name: trainingsplit.name, id: trainingsplit.id }))} editTrainingSplit={editTrainingSplit} deleteTrainingSplit={deleteTrainingSplit} />

        </section>

        <div className={styles["add-training-wrapper"]}>
          <button className={styles["add-training-button"]} onClick={openDialog}>Add Training Split</button>
        </div>
      </div>
    </>
  )
}