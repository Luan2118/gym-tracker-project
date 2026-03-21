import { Link, useOutletContext } from 'react-router-dom'
import styles from './Dashboard.module.css'
import formatISODate from '../../utils/formatISODate';
import setPastDate from '../../utils/setPastDate';

export default function Dashboard() {

  // Body Weight card
  const { bodyWeights, workoutHistory } = useOutletContext();

  const sortedBodyWeights = [...bodyWeights].sort((a, b) => new Date(b.date) - new Date(a.date))


  const latestEntry = sortedBodyWeights.length > 0 ? sortedBodyWeights[0] : [];

  const entryDate = new Date(latestEntry.date);
  const today = new Date();

  const diffMs = today - entryDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));


  // Last Workout card
  const sortedWorkoutHistory = [...workoutHistory].sort((a, b) => new Date(b.date) - new Date(a.date))

  const lastWorkout = sortedWorkoutHistory.length > 0 ? sortedWorkoutHistory[0] : [];

  const lastWorkoutDate = formatISODate(lastWorkout.date)


  // This Week workouts count
  const last7Days = new Date(setPastDate(7))
  const thisWeekWorkouts = workoutHistory.filter((w) => new Date(w.date) >= last7Days)

  const subText =
    thisWeekWorkouts.length === 0 ? 'No workouts yet' :
      thisWeekWorkouts.length === 1 ? 'Needs work' :
        thisWeekWorkouts.length === 2 ? 'Getting there' : 'Good consistency'


  const totalWorkouts = workoutHistory.length;

  const totalWorkoutSubtext =
    totalWorkouts === 0 ? 'Start your first workout'
      : totalWorkouts < 10 ? 'Getting started'
        : totalWorkouts < 25 ? 'Building momentum'
          : totalWorkouts < 50 ? 'Putting in the work'
            : totalWorkouts < 100 ? 'Strong track record'
              : 'Built through consistency';


  // This Week Summary

  // total sets 
  const totalSets = thisWeekWorkouts.reduce((workoutAcc, workout) => {
    const setsInWorkout = workout.exercises.reduce((exAcc, ex) => {
      return exAcc + ex.sets.length
    }, 0)

    return workoutAcc + setsInWorkout
  }, 0)

  // total exercises

  const totalExercises = thisWeekWorkouts.reduce((workoutAcc, workout) => {
    return workoutAcc + workout.exercises.length
  }, 0)

  return (
    <>
      <header>
        <h1>Dashboard</h1>
      </header>

      <div className={styles['main-content-wrapper']}>
        <section className={styles['overview-wrapper']}>
          <h2 className={styles['sr-only']}>Overview</h2>

          <div className={styles['overview-card-wrapper']}>
            <div className={styles['overview-card']}>
              <div className={styles['overview-card-text']}>Latest Weight:</div>
              <div className={styles['overview-card-value']}>{latestEntry.bw} kg</div>
              <div className={styles['overview-card-value-additional']}>Updated {diffDays !== 0 ? `${diffDays} days ago ` : 'today'}</div>

            </div>

            <div className={styles['overview-card']}>
              <div className={styles['overview-card-text']}>Last Workout:</div>
              <div className={styles['overview-card-value']}>{lastWorkout.workoutDay}</div>
              <div className={styles['overview-card-value-additional']}>{lastWorkoutDate}</div>
            </div>

            <div className={styles['overview-card']}>
              <div className={styles['overview-card-text']}>This Week:</div>
              <div className={styles['overview-card-value']}>{thisWeekWorkouts.length} workouts </div>
              <div className={styles['overview-card-value-additional']}>{subText}</div>
            </div>

            <div className={styles['overview-card']}>
              <div className={styles['overview-card-text']}>Total Workouts:</div>
              <div className={styles['overview-card-value']}>{workoutHistory.length}</div>
              <div className={styles['overview-card-value-additional']}>{totalWorkoutSubtext}</div>
            </div>
          </div>
        </section>

        <div className={styles['panel-content-wrapper']}>
          <section className={styles['panel-wrapper']}>
            <h2 className={styles['panel-title']}>This Week Summary</h2>

            <div className={styles['week-summary-wrapper']}>
              <div className={styles['week-summary-card']}>
                <div className={styles['week-summary-title']}>Total Sets</div>
                <div className={styles['week-summary-value']}>{totalSets}</div>
              </div>

              <div className={styles['week-summary-card']}>
                <div className={styles['week-summary-title']}>Total Exercises</div>
                <div className={styles['week-summary-value']}>{totalExercises}</div>
              </div>

              <div className={styles['week-summary-card']}>
                <div className={styles['week-summary-title']}>Weigh-ins</div>
                <div className={styles['week-summary-value']}>5</div>
              </div>

              <div className={styles['week-summary-card']}>
                <div className={styles['week-summary-title']}>Avg Weight</div>
                <div className={styles['week-summary-value']}>66 kg</div>
              </div>
            </div>
          </section>


          <section className={styles['panel-wrapper']}>
            <h2 className={styles['panel-title']}>Quick actions</h2>

            <div className={styles['quick-actions-buttons-wrapper']}>
              <Link to='/active-workout' className={styles['start-workout-button']}>
                <span className={styles['quick-actions-title']}>Start Workout</span>
                <span className={styles['quick-actions-text']}>Begin your workout</span>
              </Link>

              <Link to="/body-weight" className={styles['log-body-weight-button']} >
                <span className={styles['quick-actions-title']}>Log Body Weight</span>
                <span className={styles['quick-actions-text']}>Track your latest weigh-in</span>
              </Link>

              <Link to="/training-split" className={styles['add-training-split-button']}>
                <span className={styles['quick-actions-title']}>Add Training Split</span>
                <span className={styles['quick-actions-text']}>Create your training split</span>
              </Link>

              <Link to="/exercises" className={styles['browse-exercises-button']} >
                <span className={styles['quick-actions-title']}>Browse Exercises</span>
                <span className={styles['quick-actions-text']}>Explore your exercise history</span>
              </Link>
            </div>
          </section>

          <section className={styles['panel-wrapper']}>
            <div className={styles['panel-header']}>
              <h2 className={styles['panel-title']}>Recent Workouts</h2>
              <Link to="workout-history" className={styles['view-all-button']}>View All</Link>
            </div>

            <div className={styles['recent-workout-card-wrapper']}>

              <div className={styles['recent-workout-card']}>
                <div>
                  <div className={styles['recent-workout-workout-day-title']}>Upper</div>
                  <div className={styles['recent-workout-workout-day-date']}>16 Mar 2026</div>
                </div>
                <div className={styles['recent-workout-workout-day-exercises']}>6 exercises</div>
              </div>

              <div className={styles['recent-workout-card']}>
                <div>
                  <div className={styles['recent-workout-workout-day-title']}>Upper</div>
                  <div className={styles['recent-workout-workout-day-date']}>16 Mar 2026</div>
                </div>
                <div className={styles['recent-workout-workout-day-exercises']}>6 exercises</div>
              </div>

              <div className={styles['recent-workout-card']}>
                <div>
                  <div className={styles['recent-workout-workout-day-title']}>Upper</div>
                  <div className={styles['recent-workout-workout-day-date']}>16 Mar 2026</div>
                </div>
                <div className={styles['recent-workout-workout-day-exercises']}>6 exercises</div>
              </div>
            </div>

          </section>

          <section className={styles['panel-wrapper']}>
            <div className={styles['panel-header']}>
              <h2 className={styles['panel-title']}>Weight Summary</h2>
              <Link to="/body-weight" className={styles['view-all-button']}>View All</Link>
            </div>

            <div className={styles['weight-summary-current-text']}>
              current
            </div>
            <div className={styles['weight-summary-current-weight']}>
              68 kg
            </div>

            <div >
              <div className={styles['weight-summary-previous-info-wrapper']}>
                <div className={styles['weight-summary-previous-text']}>Previous</div>
                <div className={styles['weight-summary-previous-weight']}>67 kg</div>
              </div>

              <div className={styles['weight-summary-change-info-wrapper']}>
                <div className={styles['weight-summary-change-text']}>Change</div>
                <div className={styles['weight-summary-change-value']}>-1 kg</div>
              </div>
            </div>

          </section>


        </div>
      </div>
    </>
  )
}