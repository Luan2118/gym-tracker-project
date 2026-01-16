import styles from './BodyWeight.module.css'
import BodyWeightList from './components/BodyWeightList'
import formatDate from '../../utils/formatDate';
import { useEffect, useState } from 'react';

export default function BodyWeight() {


  const  today = new Date() ;
  const formattedToday =   formatDate(today)

  const initialBodyWeightData = [
  {
    bw: '75.5', id: crypto.randomUUID(), date: '2026-01-25',
  },
  {
    bw: '80', id: crypto.randomUUID(), date: '2026-01-15',
  },
  {
    bw: '85', id: crypto.randomUUID(), date: '2026-01-30',
  },
  {
    bw: '74.8', id: crypto.randomUUID(), date: '2026-01-05',
  },
  {
    bw: '76.2', id: crypto.randomUUID(), date: '2026-01-10',
  },
  {
    bw: '77.0', id: crypto.randomUUID(), date: '2026-01-18',
  },
  {
    bw: '78.4', id: crypto.randomUUID(), date: '2026-01-22',
  },
  {
    bw: '81.3', id: crypto.randomUUID(), date: '2026-02-02',
  },
  {
    bw: '82.1', id: crypto.randomUUID(), date: '2026-02-08',
  },
  {
    bw: '83.6', id: crypto.randomUUID(), date: '2026-02-14',
  },
];

  const [bodyWeights, setBodyWeights] = useState(initialBodyWeightData);
  const [bodyWeightInputText, setBodyWeightInputText] = useState('');
  const [feedback, setFeedback] = useState(null)


  useEffect(() => {
    if (feedback !== 'added') return;

    const addedID = setTimeout(() => {
        setFeedback(null)
      }, 4000)
    
    return () => clearTimeout(addedID)
  }, [feedback])
    
  function addBodyWeight() {
    setBodyWeights((prev) => {
      return [
        ...prev,
        {bw: bodyWeightInputText, id: crypto.randomUUID(), date: formattedToday}
      ]
    })

    setFeedback('added')
  }

  return (
    <>
      <header>
        <h1>Body Weight</h1>
      </header>


      <div className={styles["content-wrapper"]}>

        <div className={styles["weight-submit-wrapper"]}>

          <div className={styles["weight-input-wrapper"]}>
            <label htmlFor="body-weight" className={styles["weight-input-label"]}>Weight: </label>
            <input type="text" id="body-weight" className={styles["weight-input"]} value={bodyWeightInputText} onChange={(e) => setBodyWeightInputText(e.target.value)}/>
          </div>

          <button className={styles["add-weight-button"]} onClick={addBodyWeight}>Add Weight</button>
        </div>
        {feedback === 'added' ? <div className={styles["body-weight-added"]}>&#9989; Body weight added</div> : ''}
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
          <BodyWeightList bodyWeights={bodyWeights} />
        </ul>
      </div>
    </>
  )
}