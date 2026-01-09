import styles from './TrainingSplitItem.module.css'

export default function TrainingSplitItem({trainingSplits}) {
  return (
    <>
      {trainingSplits.map((trainingSplit) => {
        return (
        <section className={styles["training-split-wrapper"]} key={trainingSplit.id}>
          <h3>{trainingSplit.name}</h3>

          <div className={styles["button-wrapper"]}>
            <button className={styles["modify-button"]}>Modify</button> 
            <button className={styles["delete-button"]}>Delete</button>
          </div>
        </section>
        )
      })}
    </>
  )
}