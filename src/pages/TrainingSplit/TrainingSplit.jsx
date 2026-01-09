import { useState, useRef } from 'react'
import TrainingSplitList from './components/TrainingSplitList'
import checkmark from '../../assets/training-split/checkmark.png'
import close from '../../assets/training-split/x-close.png'
import styles from './TrainingSplit.module.css'

export default function TrainingSplit() {

  const trainingSplitData = [
    {
      name: 'Upper Lower', id: crypto.randomUUID()
    }, 
    {
      name: 'PPL', id: crypto.randomUUID()
    }]
  
  const [trainingSplits, setTrainingSplits] = useState(trainingSplitData)
  const dialogRef = useRef(null) 

  function addTrainingSplit() {
    dialogRef.current.showModal()
    
  }

  function addTrainingDay() {

  }
  return (
    <>
      <header>
        <h1>Training Split</h1>
      </header>

      <div className={styles["content-wrapper"]}>

        <div className={styles["add-training-wrapper"]}>
          <button className={styles["add-training-button"]} onClick={addTrainingSplit}>Add Training Split</button>
        </div>

        <dialog ref={dialogRef} className={styles["add-training-split-dialog"]}>
          <div>

            <div className={styles["training-split-name-wrapper"]}>
              <label htmlFor="training-split-name"></label>
              <input type="text"  id="training-split-name" placeholder='Training Split Name' className={styles["training-split-name-input"]}/>

              <button className={styles["add-workout-button"]} onClick={addTrainingDay}>Add a Workout</button>

              <button className={styles["close-dialog-button"]} aria-label='Close dialog'>
                <img className={styles["close-dialog-img"]} src={close} alt=''/>
              </button>
            </div>

            <hr aria-hidden="true"/>

            <div className={styles["workout-day-wrapper"]}>
              <label htmlFor="workout-day" />
              <input type="text" id="workout-day" placeholder='Upper, Push, Legs' className={styles["workout-day-input"]}/>
              
              <span></span>
              
              <button className={styles["workout-day-button"]} aria-label='Confirm Workout Day'>
                <img className={styles["checkmark-icon"]}  src={checkmark} alt=''/>
                </button>
            </div>


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