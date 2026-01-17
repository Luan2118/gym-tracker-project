import { Outlet } from "react-router-dom"
import Sidebar from '../components/Sidebar/Sidebar'

export default function Layout() {

  return (
    <div className='layout'>

      <a className='skip-link' href="#main">Skip to Content</a>

      <Sidebar />

      <main id='main' className='main-content' tabIndex={-1}>
        <Outlet/>
      </main>
    </div>
  )
}