import { Outlet, Link } from 'react-router-dom'
import { useState } from 'react'
import dashboard from '../../assets/dashboard.png'
import title from '../../assets/title.png'
import progress from '../../assets/progress.png'
import active from '../../assets/active-workout.png'
import history from '../../assets/history.png'
import exercisesPage from '../../assets/exercises.png'
import benchpress from '../../assets/exercises/benchpress.png'
import bicepcurls from '../../assets/exercises/bicepcurls.png'
import hammercurls from '../../assets/exercises/hammercurls.png'
import inclinebenchpress from '../../assets/exercises/inclinebenchpress.png'
import legpress from '../../assets/exercises/legpress.png'
import pulldown from '../../assets/exercises/pulldown.png'
import pullup from '../../assets/exercises/pullup.png'
import skullcrushers from '../../assets/exercises/skullcrushers.png'
import squat from '../../assets/exercises/squat.png'
import triceppushdowns from '../../assets/exercises/triceppushdowns.png'

import './Sidebar.css'

export default function Sidebar() {

 const exercisesList = [
    {
      id: crypto.randomUUID(),
      name: "Bicep Curls",
      video: "video_1",
      icon: bicepcurls,
    },
    {
      id: crypto.randomUUID(),
      name: "Hammer Curls",
      video: "video_2",
      icon: hammercurls,
    },
    {
      id: crypto.randomUUID(),
      name: "Tricep Pushdowns",
      video: "video_3",
      icon: triceppushdowns,
    },
    {
      id: crypto.randomUUID(),
      name: "Skull Crushers",
      video: "video_4",
      icon: skullcrushers,
    },
    {
      id: crypto.randomUUID(),
      name: "Bench Press",
      video: "video_5",
      icon: benchpress,
    },
    {
      id: crypto.randomUUID(),
      name: "Incline Dumbbell Press",
      video: "video_6",
      icon: inclinebenchpress,
    },
    {
      id: crypto.randomUUID(),
      name: "Pull Ups",
      video: "video_7",
      icon: pullup,
    },
    {
      id: crypto.randomUUID(),
      name: "Lat Pulldown",
      video: "video_8",
      icon: pulldown,
    },
    {
      id: crypto.randomUUID(),
      name: "Squats",
      video: "video_9",
      icon: squat,
    },
    {
      id: crypto.randomUUID(),
      name: "Leg Press",
      video: "video_10",
      icon: legpress,
  },
  ]


  const [exercises, setExercises] = useState(exercisesList)



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
                <img src={exercisesPage} alt='' aria-hidden="true"/>
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
        <Outlet context={{exercises, setExercises}}/>
      </main>
    </div>
  )
}