import styles from './WorkoutHistory.module.css'
import { useOutletContext } from 'react-router-dom'
import WorkoutHistoryItem from './components/WorkoutHistoryItem';
import { useState } from 'react';

export default function WorkoutHistory() {

  const { workoutHistory } = useOutletContext();
  const [selectedSplitName, setSelectedSplitName] = useState('');
  const [selectedWorkoutDayName, setSelectedWorkoutDayName] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);


  const sortedWorkoutHistory = [...workoutHistory].sort((a, b) => { return new Date(b.date) - new Date(a.date) })
  const trainingSplitOptions = [];

  const [filteredWorkoutHistory, setFilteredWorkoutHistory] = useState(sortedWorkoutHistory);

  const itemsPerPage = 5;

  const totalPages = Math.max(1, Math.ceil(filteredWorkoutHistory.length / itemsPerPage))

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage

  const paginatedFilteredWorkoutHistory = filteredWorkoutHistory.slice(startIndex, endIndex)

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2)

  
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);


  workoutHistory.forEach((w) => {
    if (!trainingSplitOptions.some((split) => split.trainingSplitName === w.trainingSplitName)) {
      trainingSplitOptions.push({
        trainingSplitName: w.trainingSplitName,
        id: w.id,
      });
    }
  });

  const workoutDayOptions = [];

  workoutHistory.forEach((w) => {
    if (!workoutDayOptions.some((workout) => workout.workoutDay === w.workoutDay)) {
      workoutDayOptions.push({
        workoutDay: w.workoutDay,
        id: w.id,
      });
    }
  });


  function handleFilterForm(e) {
    e.preventDefault();

    let result = sortedWorkoutHistory.filter((w) => {


      if (!selectedSplitName) {
        if (w.workoutDay !== selectedWorkoutDayName) return;
        return w;
      }

      if (!selectedWorkoutDayName) {
        if (w.trainingSplitName !== selectedSplitName) return
        return w
      }

      if (selectedSplitName || selectedWorkoutDayName) {
        if (w.workoutDay !== selectedWorkoutDayName) return;
        if (w.trainingSplitName !== selectedSplitName) return;

        return w;
      }
    })

    if (!selectedSplitName && !selectedWorkoutDayName && selectedSort) {
      if (selectedSort === 'newest') sortedWorkoutHistory.sort((a, b) => { return new Date(b.date) - new Date(a.date) })

      if (selectedSort === 'oldest') sortedWorkoutHistory.sort((a, b) => { return new Date(a.date) - new Date(b.date) })

      setFilteredWorkoutHistory(sortedWorkoutHistory)
      setCurrentPage(1);
      return;
    }

    if (selectedSort === 'newest') result.sort((a, b) => { return new Date(b.date) - new Date(a.date) })

    if (selectedSort === 'oldest') result.sort((a, b) => { return new Date(a.date) - new Date(b.date) })

    setFilteredWorkoutHistory(result)
    setCurrentPage(1);

  }

  function clearFilters() {
    setSelectedSort('')
    setSelectedSplitName('');
    setSelectedWorkoutDayName('');
    setFilteredWorkoutHistory(sortedWorkoutHistory)
    setCurrentPage(1);
  }
  return (
    <>
      <header>
        <h1>Workout History</h1>
      </header>

      <div className={styles["section-wrapper"]}>
        <form className={styles["filter-wrapper"]} onSubmit={(e) => handleFilterForm(e)}>
          <div>
            <label htmlFor="training-split" className={styles["sr-only"]}>Training Split</label>
            <select id="training-split" className={styles["filter-input"]} onChange={(e) => setSelectedSplitName(e.target.value)} value={selectedSplitName}>
              <option value="" disabled>Select Training Split</option>
              {trainingSplitOptions.map((w) => {
                return (
                  <option value={w.trainingSplitName} key={w.id}>{w.trainingSplitName}</option>
                )
              })}
            </select>

            <label htmlFor="workout-day" className={styles["sr-only"]}>Workout Day</label>
            <select id="workout-day" className={styles["filter-input"]} onChange={(e) => setSelectedWorkoutDayName(e.target.value)} value={selectedWorkoutDayName}>
              <option value="" disabled>Select Workout Day</option>
              {workoutDayOptions.map((w) => {
                return (
                  <option value={w.workoutDay} key={w.id}>{w.workoutDay}</option>
                )
              })}
            </select>

            <label htmlFor="sort" className={styles["sr-only"]}>Sort</label>
            <select id="sort" className={styles["filter-input"]} onChange={(e) => setSelectedSort(e.target.value)} value={selectedSort}>
              <option value="" disabled>Sort</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>

          </div>

          <button type='submit' disabled={!selectedWorkoutDayName && !selectedSplitName && !selectedSort} className={styles["filter-button"]}>Filter</button>
          <button type='button' onClick={clearFilters} className={styles["clear-button"]}>Clear</button>
        </form>

        <div className={styles["content-main"]}>
          {
            filteredWorkoutHistory.length > 0 ?
              <>
                <WorkoutHistoryItem
                  workoutHistory={workoutHistory}
                  filteredWorkoutHistory={paginatedFilteredWorkoutHistory}
                />
                <div className={styles["pagination-wrapper"]}>
                  <button type="button" className={styles["pagination-button"]} onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1}>Prev</button>

                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={
                        currentPage === page
                          ? styles["active-page-button"]
                          : styles["page-button"]
                      }
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button type="button" className={styles["pagination-button"]} onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage === totalPages}>Next</button>
                </div>
              </>

              :
              <div>No matched workouts</div>
          }
        </div>
      </div>
    </>
  )
}