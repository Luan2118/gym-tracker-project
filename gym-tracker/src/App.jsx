import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Sidebar from './pages/Sidebar'
import ActiveWorkout from './pages/ActiveWorkout'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Sidebar />}>
        <Route index  element={<Dashboard />}/>
        <Route path='active-workout' element={<ActiveWorkout />} />
      </Route>
    </Routes>
  )
}

export default App
