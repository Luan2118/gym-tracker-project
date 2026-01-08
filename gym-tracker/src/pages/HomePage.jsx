import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <>
    <header>
      <h1>Dashboard</h1>
    </header>

    <div className={styles["content-wrapper"]}>
      <section>
        <h2>
          <Link to='/active-workout'>Start Workout</Link>
        </h2>
      </section>

      <section>
        <h2>
          Weekly Stats
        </h2>
      </section>

      <section>
        <h2>
          Training Split
        </h2>
      </section>

       <section>
        <h2>
         Body Weight
        </h2>
      </section>
    </div>    
    </>
  )
}