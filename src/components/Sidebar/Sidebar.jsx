import { Link } from 'react-router-dom'
import dashboard from '../../assets/dashboard.png'
import title from '../../assets/title.png'
import active from '../../assets/active-workout.png'
import history from '../../assets/history.png'
import exercisesPage from '../../assets/exercises.png'
import bodyweight from '../../assets/bodyweight.png'
import trainingSplit from '../../assets/trainingSplit.png'
import menuIcon from '../../assets/menu-icon.png'
import styles from './Sidebar.module.css'


export default function Sidebar() {
  return (
    <>
      <div className={styles['menu-button-wrapper']}>
        <button className={styles['menu-button']}>
          <img src={menuIcon} alt="Menu" />
        </button>
      </div>

      <aside className={styles['sidebar']}>

        <header className={styles['title-header']}>
          <img className={styles['title-img']} src={title} alt='' aria-hidden="true" />
          <div className={styles['title']}>Gym Tracker</div>
        </header>
        <hr aria-hidden="true" />

        <nav>
          <ul>
            <li>
              <Link to='/' className={styles['sidebar-nav-link']}>
                <img src={dashboard} alt='' aria-hidden="true" />
                <div>DashBoard</div>
              </Link>
            </li>

            <li>
              <Link to='/active-workout' className={styles['sidebar-nav-link']}>
                <img src={active} alt='' aria-hidden="true" />
                <div>Active Workout</div>
              </Link>
            </li>

            <li>
              <Link to='/workout-history' className={styles['sidebar-nav-link']}>
                <img src={history} alt='' aria-hidden="true" />
                <div>Workout History</div>
              </Link>
            </li>

            <li>
              <Link className={styles['sidebar-nav-link']} to="/exercises">
                <img src={exercisesPage} alt='' aria-hidden="true" />
                <div>Exercises</div>
              </Link>
            </li>

            <li>
              <Link className={styles['sidebar-nav-link']} to="/training-split">
                <img src={trainingSplit} alt='' aria-hidden="true" />
                <div>Training Split</div>
              </Link>
            </li>

            <li>
              <Link className={styles['sidebar-nav-link']} to="/body-weight">
                <img src={bodyweight} alt='' aria-hidden="true" />
                <div>Body Weight</div>
              </Link>
            </li>

          </ul>
        </nav>
      </aside>
    </>

  )
}