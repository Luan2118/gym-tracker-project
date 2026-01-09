import { useState } from 'react'
import TrainingSplitList from './components/TrainingSplitList'
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
  return (
    <>
      <header>
        <h1>Training Split</h1>
      </header>

      <div className={styles["content-wrapper"]}>

        <div className={styles["add-training-wrapper"]}>
          <button className={styles["add-training-button"]}>Add Training Split</button>
        </div>

        <section className={styles["content-main"]}>
          <h2 className={styles["all-training-splits"]}>All Training Splits</h2>

          <hr />

        
          <TrainingSplitList  trainingSplits={trainingSplits}/>
            
        </section>
      </div>
    </>
  )
}