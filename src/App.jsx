import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Sidebar from './components/Sidebar/Sidebar'
import ActiveWorkout from './pages/ActiveWorkout/ActiveWorkout'
import './App.css'
import TrainingSplit from './pages/TrainingSplit/TrainingSplit'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Sidebar />}>
        <Route index  element={<Dashboard />}/>
        <Route path='active-workout' element={<ActiveWorkout />} />
        <Route path='training-split' element={<TrainingSplit />} />
      </Route>
    </Routes>
  )
}

export default App
