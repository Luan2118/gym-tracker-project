import { useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import styles from './ActiveWorkout.module.css'
import closeX from '../../assets/activeWorkout/x-close.png'
import ActiveExerciseCard from './components/ActiveExerciseCard'
import { EXERCISE_BASE_PREFIX } from '../../data/exercises'

export default function ActiveWorkout() {

  const dialogRef = useRef(null);

  const { trainingSplits, workoutHistory, setWorkoutHistory } = useOutletContext();

  const [activeWorkout, setActiveWorkout] = useState(false);
  const [splitSelectId, setSplitSelectId] = useState('');
  const [selectedWorkoutDayId, setSelectedWorkoutDayId] = useState('');
  const [activeExercises, setActiveExercises] = useState([]);



  function handleStartWorkout() {
    openDialog();
    setSplitSelectId('');
    setSelectedWorkoutDayId('')
    setActiveWorkout(false);
  }

  function handleCancelWorkout () {
    setActiveWorkout(false);
    setActiveExercises([]);

  }

  const selectedTrainingSplit = trainingSplits
    .find((split) => split.id === splitSelectId)

  const selectedWorkoutDay = selectedTrainingSplit?.workoutDays.find((workoutday) => workoutday.id === selectedWorkoutDayId)

  const activeWorkoutData =
    selectedWorkoutDay
      ?.exercises ?? [];

  function openDialog() {
    dialogRef.current.showModal()
  }

  function closeDialog() {
    dialogRef.current.close()
  }


  function handleSelectCategory(e) {
    setSplitSelectId(e.target.value)
  }

  const selectedSplit = trainingSplits.find((trainingSplit) => trainingSplit.id === splitSelectId)


  function selectWorkoutDay(workoutDayId) {
    setSelectedWorkoutDayId(workoutDayId)
  }




  function handleSubmitStartWorkout(e) {
    e.preventDefault();
    setActiveWorkout(true)
    setActiveExercises(activeWorkoutData.map((ex) => {
      return {
        exerciseName: ex.exerciseName,
        exerciseId: ex.exerciseId,
        images: ex.images,
        sets: ex.sets.map((set) => {
          return {
            id: set.id,
            sessionId: crypto.randomUUID()
          }
        })
      }
    }));
    closeDialog();
  }


  function handleWeightSet(e, setId, exerciseId) {
    const weightInputValue = e.target.value === '' ? '' : Number(e.target.value);

    const newExerciseList = activeExercises.map((ex) => {
      if (ex.exerciseId !== exerciseId) return ex;

      const newSetList = ex.sets.map((set) => {
        if (set.id !== setId) return set;

        return {
          ...set,
          weight: weightInputValue
        }
      })

      return {
        ...ex,
        sets: newSetList
      }
    })

    setActiveExercises(newExerciseList)
  }

  function handleRepsSet(e, setId, exerciseId) {
    const repstInputValue = e.target.value === '' ? '' : Number(e.target.value);
    const newExerciseList = activeExercises.map((ex) => {
      if (ex.exerciseId !== exerciseId) return ex;

      const newSetList = ex.sets.map((set) => {
        if (set.id !== setId) return set;

        return {
          ...set,
          reps: repstInputValue
        }
      })

      return {
        ...ex,
        sets: newSetList
      }
    })

    setActiveExercises(newExerciseList)
  }

  function handlefinishworkout() {
    setActiveWorkout(false)

    const newWorkoutHistory = {
      id: crypto.randomUUID(),
      trainingSplitName: selectedTrainingSplit.name,
      workoutDay: selectedWorkoutDay.name,
      date: new Date().toISOString(),
      exercises: activeExercises
    }


    setWorkoutHistory((prev) => {
      return [
        ...prev,
        newWorkoutHistory
      ]
    });
  }



  return (
    <>
      <header>
        <h1>Active Workout</h1>
      </header>


      <div className={styles["content-wrapper"]}>

        <section className={styles["content-main"]}>
          {activeWorkout ?
            <>
              <div className={styles["active-workout-header"]}>
                <div className={styles["active-workout-split"]}>Split: {selectedTrainingSplit?.name}</div>
                <div className={styles["active-workout-workout-day"]}>Workout Day: {selectedWorkoutDay?.name ?? '-'}</div>
                <div className={styles["active-workout-timer"]}>Timer: 00:00</div>
              </div>

              {activeWorkoutData.map((ex) =>
                <ActiveExerciseCard
                  key={ex.exerciseId}
                  ex={ex}
                  activeExercises={activeExercises}
                  workoutHistory={workoutHistory}
                  handleWeightSet={handleWeightSet}
                  handleRepsSet={handleRepsSet}
                />
              )}


              <button type='button' onClick={() => handlefinishworkout()} className={styles["finish-workout-button"]} >Finish Workout</button>
            </>
            : <h2 className={styles["no-active-workout-text"]}>No Active Workout</h2>}
        </section>

        <div className={styles["start-workout-wrapper"]}>
          {!activeWorkout ?
          <button type='button' className={styles["start-workout-button"]} onClick={handleStartWorkout}>
            Start Workout
          </button>:
          <button className={styles["cancel-workout-button"]}  onClick={handleCancelWorkout}>Cancel Workout</button>
          }

          <dialog ref={dialogRef} className={styles["dialog-popup"]}>
            <form className={styles["form-wrapper"]} onSubmit={handleSubmitStartWorkout}>
              <div className={styles["form-header-wrapper"]}>
                <label htmlFor="training-split" className={styles["training-split-text"]}>Training Split: </label>
                <select id="training-split" className={styles["select-input"]} onChange={handleSelectCategory} value={splitSelectId}>
                  <option value="" id="" disabled>Select a Split</option>
                  {trainingSplits.map((trainingSplit) => {
                    return (
                      <option value={trainingSplit.id} className={styles["select-option"]} key={trainingSplit.id}>{trainingSplit.name}</option>
                    )
                  })}
                </select>

                <button type='button' aria-label='close dialog' className={styles["close-dialog-button"]} onClick={closeDialog}>
                  <img src={closeX} alt="" className={styles["close-dialog-img"]} />
                </button>
              </div>

              {selectedSplit && selectedSplit.workoutDays.map((workoutday) => {
                return (
                  <div key={workoutday.id}>
                    <div className={styles["workout-day-button-wrapper"]}>
                      <div>Workout Day: </div>
                      <button type='button' className={selectedWorkoutDayId === workoutday.id ? styles["workout-day-button-active"] : styles["workout-day-button"]} onClick={() => selectWorkoutDay(workoutday.id)}>{workoutday.name}</button>
                    </div>

                    <div>
                      {selectedWorkoutDayId === workoutday.id ?
                        workoutday.exercises.map((exer) => {
                          return (
                            <div key={exer.exerciseId}>
                              <div className={styles["exercise-name-img-wrapper"]}>
                                <img src={`${EXERCISE_BASE_PREFIX}${exer.images[0]}`} alt="" className={styles["exercise-img"]} />
                                <div>{exer.exerciseName}</div>
                              </div>
                              {exer.sets.map((set, index) => {
                                return (
                                  <div key={set.id} className={styles["set-wrapper"]}>
                                    <fieldset className={styles["fieldset-wrapper"]}>
                                      <legend className={styles["sr-only"]}>Set {index + 1}</legend>

                                      <div className={styles["set-text"]}>Set {index + 1}</div>

                                      <div className={styles["set-input-wrapper"]}>
                                        <label htmlFor={`weight-${set.id}`} className={styles["sr-only"]}>Weight</label>
                                        <input type="text" id={`weight-${set.id}`} className={styles["weight-input"]} value={set.weight} readOnly />
                                        x
                                        <label htmlFor={`reps-${set.id}`} className={styles["sr-only"]}>Reps</label>
                                        <input type="text" id={`reps-${set.id}`} className={styles["reps-input"]} value={set.reps} readOnly />
                                      </div>
                                    </fieldset>
                                  </div>
                                )
                              })}
                            </div>
                          )
                        }) : ''
                      }
                    </div>
                  </div>
                )
              })}

              <button type='submit' className={styles["start-workout-confirm-button"]}>Start</button>
            </form>
          </dialog>
        </div>
      </div>
    </>


  )
}
