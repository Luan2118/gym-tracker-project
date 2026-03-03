import { useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import styles from  './ActiveWorkout.module.css'
import closeX from '../../assets/activeWorkout/x-close.png'

export default function ActiveWorkout() {

  const dialogRef = useRef(null);

  const { trainingSplits } = useOutletContext();

  const [activeWorkout, setActiveWorkout] = useState(false);
  const [splitSelectId, setSplitSelectId] = useState('');
  const [splitSelected, setSplitSelected] = useState(false);
  const [selectedWorkoutDayId, setSelectedWorkoutDayId] = useState('');


  function openDialog() {
    dialogRef.current.showModal()
  }

  function closeDialog() {
    dialogRef.current.close()
  }

  function handleSelectCategory(e) {
   setSplitSelectId(e.target.value)
   setSplitSelected(true);
  }

  const selectedSplit = trainingSplits.find((trainingSplit) => trainingSplit.id === splitSelectId)


  function selectWorkoutDay(workoutDayId) {
    setSelectedWorkoutDayId(workoutDayId)
  }

  function handleSubmitStartWorkout(e) {
    e.preventDefault();
    setActiveWorkout(true)
    closeDialog();
  }

  function handlefinishworkout() {
    setActiveWorkout(false)
  }


  const activeWorkoutData = 
    trainingSplits
      .find((split) => split.id === splitSelectId)
      ?.workoutDays.find((workoutday) => workoutday.id === selectedWorkoutDayId)
      ?.exercises ?? [];

  console.log(activeWorkoutData)
  return (
    <>
    <header>
      <h1>Active Workout</h1>
    </header>


    <div className={styles["content-wrapper"]}>

      <div className={styles["start-workout-wrapper"]}>
        <button type='button' className={styles["start-workout-button"]} onClick={openDialog}>
          Start a Workout
        </button>

        <dialog ref={dialogRef} className={styles["dialog-popup"]}>
          <form className={styles["form-wrapper"]} onSubmit={handleSubmitStartWorkout}>
            <div className={styles["form-header-wrapper"]}> 
              <label htmlFor="training-split" className={styles["training-split-text"]}>Training Split: </label>
              <select id="training-split" className={styles["select-input"]} onChange={handleSelectCategory} value={splitSelectId}>
                <option value=""  id="" disabled>Select a Split</option>
                {trainingSplits.map((trainingSplit) => {
                  return (
                    <option value={trainingSplit.id}  className={styles["select-option"]} key={trainingSplit.id}>{trainingSplit.name}</option>
                  )
                })}
              </select>

              <button type='button' aria-label='close dialog' className={styles["close-dialog-button"]} onClick={closeDialog}>
                <img src={closeX} alt="" className={styles["close-dialog-img"]}/>
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
                    {selectedWorkoutDayId === workoutday.id  ? 
                      workoutday.exercises.map((exer) => {
                        return (
                          <div key={exer.exerciseId}>
                            <div className={styles["exercise-name-img-wrapper"]}>
                              <img src={exer.icon} alt="" className={styles["exercise-img"]}/>
                              <div>{exer.exerciseName}</div>
                            </div>
                            {exer.sets.map((set, index) => {
                              return (
                                <div key={set.id} className={styles["set-wrapper"]}>
                                  <fieldset className={styles["fieldset-wrapper"]}>
                                    <legend className={styles["sr-only"]}>Set {index +1}</legend>

                                      <div className={styles["set-text"]}>Set {index + 1}</div>

                                    <div className={styles["set-input-wrapper"]}>
                                      <label htmlFor={`weight-${set.id}`} className={styles["sr-only"]}>Weight</label>
                                      <input type="text" id={`weight-${set.id}`} className={styles["weight-input"]} value={set.weight} readOnly/>
                                      x
                                      <label htmlFor={`reps-${set.id}`} className={styles["sr-only"]}>Reps</label>
                                      <input type="text" id={`reps-${set.id}`}  className={styles["reps-input"]} value={set.reps} readOnly/>
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

      <section className={styles["content-main"]}>
        {activeWorkout ? (
          <>
          <div className={styles["active-workout-timer"]}>Timer: 00:00</div>
          {activeWorkoutData.map((ex) => {
            return (
              <div key={ex.exerciseId} className={styles["active-workout-wrapper"]}>
                <div className={styles["active-workout-name-wrapper"]}>
                  <img src={ex.icon} alt="" className={styles["active-workout-ex-icon"]}/>
                  <div  className={styles["active-workout-ex-name"]}>{ex.exerciseName}</div>
                </div>

                  <div>
                    <div>Previous set :</div>
                    {ex.sets.map((set, index) => {
                      return (
                        <div key={set.id} className={styles["active-workout-previous-set"]}>
                          <div>Set {index + 1}: {set.weight} x {set.reps}</div>
                        </div>
                      )
                    })}
                  </div>

                  <div className={styles["active-workout-set-wrapper"]}>
                    <div>Current set :</div>
                    {ex.sets.map((set, index) => {
                      return (
                         <div key={set.id} className={styles["active-workout-set-wrapper"]}>
                            <fieldset className={styles["fieldset-wrapper"]}>
                              <legend className={styles["sr-only"]}>Set {index +1}:</legend>

                                <div className={styles["set-text"]}>Set {index + 1}:</div>

                              <div className={styles["active-workout-set-input-wrapper"]}>
                                <label htmlFor={`weight-${set.id}`} className={styles["sr-only"]}>Weight</label>
                                <input type="text" id={`weight-${set.id}`} className={styles["active-workout-weight-input"]} />
                                x
                                <label htmlFor={`reps-${set.id}`} className={styles["sr-only"]}>Reps</label>
                                <input type="text" id={`reps-${set.id}`}  className={styles["active-workout-reps-input"]}/>
                              </div>
                            </fieldset>
                          </div>
                      )
                    })}
                  </div>
              </div>
            )
          })}
          </>)
          : <h2>No Active Workout</h2>}
          {activeWorkout ? <button type='button' onClick={handlefinishworkout} className={styles["finish-workout-button"]} >Finish Workout</button> : null}
      </section>
    </div>
    </>


  )
}