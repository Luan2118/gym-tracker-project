import { Link } from 'react-router-dom'
import styles from './Dashboard.module.css'

export default function Dashboard() {
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
              <div className={styles['overview-card-value']}>68 kg</div>
              <div className={styles['overview-card-value-additional']}>Updated 2 days ago</div>

            </div>

            <div className={styles['overview-card']}>
              <div className={styles['overview-card-text']}>Last Workout:</div>
              <div className={styles['overview-card-value']}>Upper</div>
              <div className={styles['overview-card-value-additional']}>16 Mar 2026</div>
            </div>

            <div className={styles['overview-card']}>
              <div className={styles['overview-card-text']}>This Week:</div>
              <div className={styles['overview-card-value']}>3 workouts</div>
              <div className={styles['overview-card-value-additional']}>Good consistency</div>
            </div>

            <div className={styles['overview-card']}>
              <div className={styles['overview-card-text']}>Total Workouts:</div>
              <div className={styles['overview-card-value']}>12</div>
              <div className={styles['overview-card-value-additional']}>Keep going!</div>
            </div>
          </div>
        </section>

        <div className={styles['panel-content-wrapper']}>
          <section className={styles['panel-wrapper']}>
            <h2 className={styles['panel-title']}>This Week Summary</h2>

            <div className={styles['week-summary-wrapper']}>
              <div className={styles['week-summary-card']}>
                <div className={styles['week-summary-title']}>Workouts</div>
                <div className={styles['week-summary-value']}>3</div>
              </div>

              <div className={styles['week-summary-card']}>
                <div className={styles['week-summary-title']}>Total Sets</div>
                <div className={styles['week-summary-value']}>42</div>
              </div>

              <div className={styles['week-summary-card']}>
                <div className={styles['week-summary-title']}>Exercises</div>
                <div className={styles['week-summary-value']}>18</div>
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