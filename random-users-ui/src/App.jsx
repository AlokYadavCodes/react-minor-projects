import { useEffect, useState } from 'react'
import './App.css'
import ProfileCard from './components/ProfileCard'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    fetch('https://api.freeapi.app/api/v1/public/randomusers')
      .then((response) => response.json())
      .then((data) => setUsers(data.data.data))
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Random User Profiles</h1>
        <p className="subtitle">Swipe through one profile at a time.</p>
      </header>

      {loading ? (
        <p className="status">Loading profiles...</p>
      ) :
        <ProfileCard users= {users} />
      }
    </main>
  )
}

export default App
