import { useEffect, useState } from 'react'
import './App.css'
import Jokes from '../components/Jokes'

function App() {
  const [jokes, setJokes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch("https://api.freeapi.app/api/v1/public/randomjokes")
      .then(response => response.json())
      .then(data => setJokes(data.data.data))
      .catch(error => console.error('Error fetching jokes:', error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="app">
      <h1>Random Jokes</h1>
      {loading ? <p className="status">Loading jokes...</p> : <Jokes jokes={jokes} />}
    </main>
  )
}

export default App
