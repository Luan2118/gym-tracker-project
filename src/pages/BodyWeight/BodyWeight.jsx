import styles from './BodyWeight.module.css'
import BodyWeightList from './components/BodyWeightList'

export default function BodyWeight() {
  return (
    <>
      <header>
        <h1>Body Weight</h1>
      </header>


      <div className={styles["content-wrapper"]}>

        <div className={styles["weight-submit-wrapper"]}>

          <div className={styles["weight-input-wrapper"]}>
            <label htmlFor="body-weight" className={styles["weight-input-label"]}>Weight: </label>
            <input type="text" id="body-weight" className={styles["weight-input"]}/>
          </div>

          <button className={styles["add-weight-button"]}>Add Weight</button>
        </div>

        <hr />


        <section className={styles["filter-section-wrapper"]}>
          <h2>Filter</h2>

          <fieldset className={styles["fieldset-wrapper"]}>
            <legend className={styles["legend-text"]}>Date:</legend>

            <div className={styles["date-from-wrapper"]}>
              <label htmlFor="date-from"  className={styles["date-from-label"]}>From</label>
              <input type="date"id="date-from"  className={styles["date-from-input"]}/>
            </div>

            <div className={styles["date-to-wrapper"]}> 
              <label htmlFor="date-to"  className={styles["date-to-label"]}>To</label>
              <input type="date"id="date-to"  className={styles["date-to-input"]}/>
            </div>
          </fieldset>

          <div className={styles["filter-buttons-wrapper"]}>
            <button type='button' className={styles["last-week-button"]}>Last Week</button>
            <button type='button' className={styles["last-2-weeks-button"]}>Last 2 Weeks</button>
            <button type='button' className={styles["last-month-button"]}>Last Month</button>
            <button type='button' className={styles["last-2-months-button"]}>Last 2 Months</button>
          </div>
        </section>

        <hr />
        <ul >
          <BodyWeightList />
        </ul>
      </div>
    </>
  )
}