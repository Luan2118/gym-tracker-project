import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar/Sidebar'

export default function Layout() {

  const [trainingSplits, setTrainingSplits] = useState(() => {
      const stored = localStorage.getItem('trainingSplits');
  
      return stored ? JSON.parse(stored) : []
  });

    useEffect(() => {
    localStorage.setItem('trainingSplits', JSON.stringify(trainingSplits));
  }, [trainingSplits])

  const [workoutHistory, setWorkoutHistory] = useState(() => {
    const stored = localStorage.getItem('workoutHistory');

    return stored ? JSON.parse(stored) : [];
  });

   useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
  }, [workoutHistory]);


  return (
    <div className='layout'>

      <a className='skip-link' href="#main">Skip to Content</a>

      <Sidebar />

      <main id='main' className='main-content' tabIndex={-1}>
        <Outlet context={{trainingSplits, setTrainingSplits, workoutHistory, setWorkoutHistory}}/>
      </main>
    </div>
  )
}