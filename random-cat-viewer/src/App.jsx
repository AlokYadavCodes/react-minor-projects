import { useEffect, useState } from 'react'
import './App.css'
import Cat from './components/Cat'

function App() {
  const [cat, setCat] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    fetch('https://api.freeapi.app/api/v1/public/cats/cat/random')
      .then((response) => response.json())
      .then((data) => setCat(data.data))
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="cat-app">
      <header className="cat-header">
        <h1>Random Cat Viewer</h1>
        <p className="cat-subtitle">A random cat.</p>
      </header>

      {loading ? (
        <p className="status">Loading cat...</p>
      ) : cat ? (
        <Cat cat={cat} />
      ) : (
        <p className="status">No cat data found.</p>
      )}
    </main>
  )
}

export default App
