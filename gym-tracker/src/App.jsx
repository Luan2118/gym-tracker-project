import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Sidebar from './pages/Sidebar'
import ActiveWorkout from './pages/ActiveWorkout'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Sidebar />}>
        <Route index  element={<HomePage />}/>
        <Route path='active-workout' element={<ActiveWorkout />} />
      </Route>
    </Routes>
  )
}

export default App
