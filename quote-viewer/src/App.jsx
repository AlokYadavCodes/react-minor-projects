import { useState } from 'react'
import './App.css'
import { useQuotes } from './hooks/useQuotes';

function App() {
  const [page, setPage] = useState(1)
  const { quotes, totalPages, loading, error } = useQuotes({ page, limit: 10 })

  return (
    <div className="app">
      <h1>Quotes</h1>

      {error && <p className="error">Something went wrong: {error.message}</p>}

      {loading ? (
        <div className="loader">
          <div className="spinner" />
          <p>Loading quotes…</p>
        </div>
      ) : (
        <div className="quotes-list">
          {quotes.map((quote) => (
            <blockquote key={quote._id} className="quote-card">
              <p className="quote-text">"{quote.content}"</p>
              <footer className="quote-author">— {quote.author}</footer>
            </blockquote>
          ))}
        </div>
      )}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ← Prev
        </button>
        <span className="page-info">
          {page} / {totalPages || '…'}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next →
        </button>
      </div>
    </div>
  )
}

export default App
