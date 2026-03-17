import styles from './BodyWeight.module.css'
import BodyWeightList from './components/BodyWeightList'
import setPastDate from '../../utils/setPastDate';
import { useEffect, useState } from 'react';

export default function BodyWeight() {

  const today = new Date().toISOString();
  const lastWeekDate = setPastDate(7);
  const lastTwoWeeksDate = setPastDate(14);
  const lastMonthDate = setPastDate(30);
  const lastTwoMonthsDate = setPastDate(60);

  const [bodyWeights, setBodyWeights] = useState(() => {
    const stored = localStorage.getItem('bodyWeights');

    return stored ? JSON.parse(stored) : [];
  });

  const [bodyWeightInputText, setBodyWeightInputText] = useState('');
  const [feedback, setFeedback] = useState(null)
  const [filter, setFilter] = useState(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  
  console.log(bodyWeights)
  
  useEffect(() => {
    localStorage.setItem('bodyWeights', JSON.stringify(bodyWeights))
  }, [bodyWeights])

  const sortedByDateBodyWeights = [...bodyWeights].sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

  const lastWeek = sortedByDateBodyWeights.filter((bw) => today > bw.date && lastWeekDate <= bw.date)
  const lastTwoWeeks = sortedByDateBodyWeights.filter((bw) => today > bw.date && lastTwoWeeksDate <= bw.date)
  const lastMonth = sortedByDateBodyWeights.filter((bw) => today > bw.date && lastMonthDate <= bw.date)
  const lastTwoMonths = sortedByDateBodyWeights.filter((bw) => today > bw.date && lastTwoMonthsDate <= bw.date)
  const customDate = sortedByDateBodyWeights.filter((bw) => dateFrom <= bw.date && dateTo >= bw.date)


  const visibleBodyWeights =
    filter === 'lastWeek' ? lastWeek :
      filter === 'lastTwoWeeks' ? lastTwoWeeks :
        filter === 'lastMonth' ? lastMonth :
          filter === 'lastTwoMonths' ? lastTwoMonths :
            filter === 'customDate' ? customDate :
              sortedByDateBodyWeights

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
        { bw: bodyWeightInputText, id: crypto.randomUUID(), date: today }
      ]
    })

    setFeedback('added')
  }

  function handleCustomDate(e) {
    setDateTo(e.target.value);
    setFilter('customDate')
  }

  function applyPreset(preset) {
    setFilter(preset);
    setDateFrom('');
    setDateTo('')
  }

  return (
    <>
      <header>
        <h1>Body Weight</h1>
      </header>


      <div className={styles["content-wrapper"]}>
        <div className={styles["content-main-wrapper"]}>
          <section className={styles["filter-section-wrapper"]}>
            <h2>Filter</h2>
            <fieldset className={styles["fieldset-wrapper"]}>
              <legend className={styles["legend-text"]}>Date:</legend>

              <div className={styles["date-from-wrapper"]}>
                <label htmlFor="date-from" className={styles["date-from-label"]}>From</label>
                <input type="date" id="date-from" className={styles["date-from-input"]} onChange={(e) => setDateFrom(e.target.value)} value={dateFrom} />
              </div>

              <div className={styles["date-to-wrapper"]}>
                <label htmlFor="date-to" className={styles["date-to-label"]}>To</label>
                <input type="date" id="date-to" className={styles["date-to-input"]} onChange={handleCustomDate} value={dateTo} />
              </div>
            </fieldset>

            <div className={styles["filter-buttons-wrapper"]}>
              <button type='button' className={filter === 'lastWeek' ? styles["clicked-filter-button"] : styles["last-week-button"]} onClick={() => applyPreset('lastWeek')}>Last Week</button>
              <button type='button' className={filter === 'lastTwoWeeks' ? styles["clicked-filter-button"] : styles["last-2-weeks-button"]} onClick={() => applyPreset('lastTwoWeeks')}>Last 2 Weeks</button>
              <button type='button' className={filter === 'lastMonth' ? styles["clicked-filter-button"] : styles["last-month-button"]} onClick={() => applyPreset('lastMonth')}>Last Month</button>
              <button type='button' className={filter === 'lastTwoMonths' ? styles["clicked-filter-button"] : styles["last-2-months-button"]} onClick={() => applyPreset('lastTwoMonths')}>Last 2 Months</button>
              <button type='button' className={filter === 'all' ? styles["clicked-filter-button"] : styles["show-all-button"]} onClick={() => applyPreset('all')}>Show All</button>
            </div>

          </section>

          <ul >
            <BodyWeightList bodyWeights={visibleBodyWeights} />
          </ul>
        </div>


        <div className={styles["weight-submit-wrapper"]}>

          <div className={styles["weight-input-wrapper"]}>
            <label htmlFor="body-weight" className={styles["weight-input-label"]}>Weight: </label>
            <input type="text" id="body-weight" className={styles["weight-input"]} value={bodyWeightInputText} onChange={(e) => setBodyWeightInputText(e.target.value)} />
          </div>

          <button className={styles["add-weight-button"]} onClick={addBodyWeight}>Add Weight</button>
          {feedback === 'added' ? <div className={styles["body-weight-added"]}>&#9989; Body weight added</div> : ''}
        </div>

      </div>
    </>
  )
}