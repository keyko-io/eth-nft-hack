import React from 'react'
import Routes from './Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import styles from './App.module.scss'

function App() {
  return(
    <div className={styles.app}>
      <Router>
      <>
        <main className={styles.main}>
          <Routes />
        </main>
      </>
      </Router>
    </div>
  )
}

export default App
