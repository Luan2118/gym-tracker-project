import styles from './BodyWeight.module.css'
import BodyWeightList from './components/BodyWeightList'
import formatDate from '../../utils/formatDate';
import setPastDate from '../../utils/setPastDate';
import { useEffect, useState } from 'react';

export default function BodyWeight() {

  const today = new Date();
  const formattedToday = formatDate(today);
  const lastWeekDate = formatDate(setPastDate(7));
  const lastTwoWeeksDate = formatDate(setPastDate(14));
  const lastMonthDate = formatDate(setPastDate(30));
  const lastTwoMonthsDate = formatDate(setPastDate(60));

  const initialBodyWeightData = [
    // february
    { bw: '83.6', id: crypto.randomUUID(), date: '2026-02-14' },
    { bw: '83.2', id: crypto.randomUUID(), date: '2026-02-12' },
    { bw: '82.9', id: crypto.randomUUID(), date: '2026-02-10' },

    // --- last week 
    { bw: '75.9', id: crypto.randomUUID(), date: '2026-01-17' },
    { bw: '75.7', id: crypto.randomUUID(), date: '2026-01-15' },
    { bw: '75.6', id: crypto.randomUUID(), date: '2026-01-13' },
    { bw: '75.4', id: crypto.randomUUID(), date: '2026-01-11' },
    { bw: '75.3', id: crypto.randomUUID(), date: '2026-01-10' },

    // --- last 2 weeks 
    { bw: '75.2', id: crypto.randomUUID(), date: '2026-01-08' },
    { bw: '75.0', id: crypto.randomUUID(), date: '2026-01-06' },
    { bw: '74.9', id: crypto.randomUUID(), date: '2026-01-04' },
    { bw: '74.8', id: crypto.randomUUID(), date: '2026-01-03' },

    // --- last month 
    { bw: '74.6', id: crypto.randomUUID(), date: '2025-12-30' },
    { bw: '74.4', id: crypto.randomUUID(), date: '2025-12-24' },
    { bw: '74.2', id: crypto.randomUUID(), date: '2025-12-18' },

    // --- last 2 months 
    { bw: '73.9', id: crypto.randomUUID(), date: '2025-12-10' },
    { bw: '73.6', id: crypto.randomUUID(), date: '2025-11-28' },
    { bw: '73.3', id: crypto.randomUUID(), date: '2025-11-18' },
  ];

  const string = "hello"
  const num = 5;


  const [bodyWeights, setBodyWeights] = useState(initialBodyWeightData);
  const [bodyWeightInputText, setBodyWeightInputText] = useState('');
  const [feedback, setFeedback] = useState(null)
  const [filter, setFilter] = useState(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const sortedByDateBodyWeights = [...bodyWeights].sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

  const lastWeek = sortedByDateBodyWeights.filter((bw) => formattedToday > bw.date && lastWeekDate <= bw.date)
  const lastTwoWeeks = sortedByDateBodyWeights.filter((bw) => formattedToday > bw.date && lastTwoWeeksDate <= bw.date)
  const lastMonth = sortedByDateBodyWeights.filter((bw) => formattedToday > bw.date && lastMonthDate <= bw.date)
  const lastTwoMonths = sortedByDateBodyWeights.filter((bw) => formattedToday > bw.date && lastTwoMonthsDate <= bw.date)
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
        { bw: bodyWeightInputText, id: crypto.randomUUID(), date: formattedToday }
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
              <button type='button' className={ filter === 'lastMonth' ? styles["clicked-filter-button"] : styles["last-month-button"]} onClick={() => applyPreset('lastMonth')}>Last Month</button>
              <button type='button' className={filter === 'lastTwoMonths' ? styles["clicked-filter-button"] : styles["last-2-months-button"]} onClick={() => applyPreset('lastTwoMonths')}>Last 2 Months</button>
              <button type='button' className={ filter === 'all' ? styles["clicked-filter-button"] : styles["show-all-button"]} onClick={() => applyPreset('all')}>Show All</button>
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