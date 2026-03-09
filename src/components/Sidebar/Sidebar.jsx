import { Link } from 'react-router-dom'
import dashboard from '../../assets/dashboard.png'
import title from '../../assets/title.png'
import active from '../../assets/active-workout.png'
import history from '../../assets/history.png'
import exercisesPage from '../../assets/exercises.png'
import bodyweight from '../../assets/bodyweight.png'
import trainingSplit from '../../assets/trainingSplit.png'


import './Sidebar.css'

export default function Sidebar() {
  return (
      <aside className='sidebar'>

        <header className='title-header'>
            <img className='title-img' src={title} alt='' aria-hidden="true"/>
            <div className='title'>Gym Tracker</div>
        </header>
        <hr aria-hidden="true"/>

        <nav>
          <ul>
            <li>
                <Link to='/' className='sidebar-nav-link'>
                  <img src={dashboard} alt='' aria-hidden="true"/>
                  <div>DashBoard</div>
                </Link>
            </li>

            <li>
                <Link to='/active-workout' className='sidebar-nav-link'>
                  <img src={active} alt='' aria-hidden="true"/>
                  <div>Active Workout</div>
                </Link>
            </li>

            <li className='sidebar-nav-link'>
                <img src={history} alt='' aria-hidden="true"/>
                <div>Workout History</div>
            </li>

            <li>
              <Link className='sidebar-nav-link' to="/exercises">
                <img src={exercisesPage} alt='' aria-hidden="true"/>
                <div>Exercises</div>
              </Link>
            </li>
            
            <li>
              <Link className='sidebar-nav-link' to="/training-split">
                <img src={trainingSplit} alt='' aria-hidden="true"/>
                <div>Training Split</div>
              </Link>
            </li>

             <li>
              <Link className='sidebar-nav-link' to="/body-weight">
                <img src={bodyweight} alt='' aria-hidden="true"/>
                <div>Body Weight</div>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

  )
}