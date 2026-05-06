import { useState } from 'react'
import './App.css'
import { useVideos } from './hooks/useVideos'

function App() {
  const [page, setPage] = useState(1)
  const { videos, totalPages, loading, error } = useVideos({ page, limit: 10 })

  return (
    <div className="app">
      <h1>Videos</h1>

      {error && <p className="error">Something went wrong: {error.message}</p>}

      {loading ? (
        <div className="loader">
          <div className="spinner" />
          <p>Loading videos…</p>
        </div>
      ) : (
        <div className="videos-grid">
          {videos.map((video) => {
            const { items } = video
            const { snippet, statistics } = items
            const thumb =
              snippet.thumbnails.maxres?.url ||
              snippet.thumbnails.high?.url ||
              snippet.thumbnails.medium?.url

            return (
              <a
                key={items.id}
                className="video-card"
                href={`https://www.youtube.com/watch?v=${items.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="thumb-wrapper">
                  <img className="video-thumb" src={thumb} alt={snippet.title} />
                </div>
                <div className="video-info">
                  <h2 className="video-title">{snippet.title}</h2>
                  <p className="video-channel">{snippet.channelTitle}</p>
                  <div className="video-meta">
                    <span>{statistics.viewCount} views</span>
                    <span>•</span>
                    <span>👍 {statistics.likeCount}</span>
                    <span>•</span>
                    <span>💬 {statistics.commentCount}</span>
                  </div>
                </div>
              </a>
            )
          })}
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
