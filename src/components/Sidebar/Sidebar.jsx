import { Outlet, Link } from 'react-router-dom'
import dashboard from '../../assets/dashboard.png'
import exercises from '../../assets/exercises.png'
import title from '../../assets/title.png'
import progress from '../../assets/progress.png'
import active from '../../assets/active-workout.png'
import history from '../../assets/history.png'

import './Sidebar.css'

export default function Sidebar() {
  return (
    <div className='layout'>
      
      <a className='skip-link' href="#main">Skip to Content</a>

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
                <img src={exercises} alt='' aria-hidden="true"/>
                <div>Exercises</div>
              </Link>
            </li>

             <li className='sidebar-nav-link'>
                <img src={progress} alt='' aria-hidden="true"/>
                <div>Progress</div>
            </li>

            
          </ul>
        </nav>
      </aside>

      <main id='main' className='main-content' tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  )
}