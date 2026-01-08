import styles from './TrainingSplit.module.css'

export default function TrainingSplit() {
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

          <section className={styles["training-split-wrapper"]}>
            <h3>Upper / Lower</h3>

            <div className={styles["button-wrapper"]}>
              <button className={styles["modify-button"]}>Modify</button> 
              <button className={styles["delete-button"]}>Delete</button>
            </div>
            
          </section >

          <section className={styles["training-split-wrapper"]}>
            <h3>Upper / Lower</h3>

            <div className={styles["button-wrapper"]}>
              <button className={styles["modify-button"]}>Modify</button> 
              <button className={styles["delete-button"]}>Delete</button>
            </div>
            
          </section >
        </section>
      </div>
    </>
  )
}