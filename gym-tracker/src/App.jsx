import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Sidebar from './pages/Sidebar'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Sidebar />}>
        <Route index  element={<HomePage />}/>
      </Route>
    </Routes>
  )
}

export default App
