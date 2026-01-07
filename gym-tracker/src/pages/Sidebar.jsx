import { Outlet, Link } from 'react-router-dom'
import dashboard from '../assets/dashboard.png'
import workouts from '../assets/workouts.png'
import exercises from '../assets/exercises.png'
import title from '../assets/title.png'
import progress from '../assets/progress.png'

import './Sidebar.css'

export default function Sidebar() {
  return (
    <div className='layout'>


      <aside className='sidebar'>

        <header className='title-header'>
            <img className='title-img' src={title}/>
            <div className='title'>Gym tracker</div>
        </header>
        <hr />
        <nav>
          <ul>
            <li className='sidebar-nav-link'>
                <img src={dashboard} />
                <Link to='/'>DashBoard</Link>
            </li>

            <li className='sidebar-nav-link'>
                <img src={workouts} />
                <div>Workouts</div>
            </li>

            <li className='sidebar-nav-link'>
                <img src={exercises} />
                <div>Exercises</div>
            </li>

             <li className='sidebar-nav-link'>
                <img src={progress} />
                <div>Progress</div>
            </li>
          </ul>
        </nav>
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  )
}