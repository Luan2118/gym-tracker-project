import { useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import styles from  './ActiveWorkout.module.css'
import closeX from '../../assets/activeWorkout/x-close.png'

export default function ActiveWorkout() {

  const dialogRef = useRef(null);

  const { trainingSplits } = useOutletContext();

  const [splitSelectId, setSplitSelectId] = useState('');
  const [splitSelected, setSplitSelected] = useState(false);
  const [selectedWorkoutDayId, setSelectedWorkoutDayId] = useState('');

  function startWorkout() {
    dialogRef.current.showModal()
  }

  function handleSelectCategory(e) {
   setSplitSelectId(e.target.value)
   setSplitSelected(true);
  }

  const selectedSplit = trainingSplits.find((trainingSplit) => trainingSplit.id === splitSelectId)


  function selectWorkoutDay(workoutDayId) {
    setSelectedWorkoutDayId(workoutDayId)
    console.log(workoutDayId)
  }

  return (
    <>
    <header>
      <h1>Active Workout</h1>
    </header>


    <div className={styles["content-wrapper"]}>

      <div className={styles["start-workout-wrapper"]}>
        <button type='button' className={styles["start-workout-button"]} onClick={startWorkout}>
          Start a Workout
        </button>

        <dialog ref={dialogRef} className={styles["dialog-popup"]}>
          <form className={styles["form-wrapper"]}>
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

              <button type='button' aria-label='close dialog' className={styles["close-dialog-button"]}>
                <img src={closeX} alt="" className={styles["close-dialog-img"]}/>
              </button>
            </div>
            
            {selectedSplit && selectedSplit.workoutDays.map((workoutday) => {
              return (
                <div key={workoutday.id} className={styles["workout-day-button-wrapper"]}>
                  <div>Workout Day: </div>
                  <button type='button' className={selectedWorkoutDayId === workoutday.id ? styles["workout-day-button-active"] : styles["workout-day-button"]} onClick={() => selectWorkoutDay(workoutday.id)}>{workoutday.name}</button>
                </div>
              )
            })}

            <button type='submit' className={styles["start-workout-confirm-button"]}>Confirm</button>
          </form>
        </dialog>
      </div>

      <section className={styles["content-main"]}>
        <h2>No Active Workout</h2>
      </section>
    </div>
    </>


  )
}