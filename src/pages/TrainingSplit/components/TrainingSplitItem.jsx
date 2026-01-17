import styles from './TrainingSplitItem.module.css'

export default function TrainingSplitItem({trainingSplits, editTrainingSplit, deleteTrainingSplit}) {
  return (
    <>
      {trainingSplits.map((trainingSplit) => {
        return (
        <section className={styles["training-split-wrapper"]} key={trainingSplit.id}>
          <h3>{trainingSplit.name}</h3>

          <div className={styles["button-wrapper"]}>
            <button type='button' className={styles["modify-button"]} onClick={() => editTrainingSplit(trainingSplit.id)}>Edit</button> 
            <button type='button' className={styles["delete-button"]} onClick={() => deleteTrainingSplit(trainingSplit.id)}>Delete</button>
          </div>
        </section>
        )
      })}
    </>
  )
}