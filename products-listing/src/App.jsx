import { useState } from 'react'
import './App.css'
import { useProducts } from './hooks/useProducts'

function App() {
  const [page, setPage] = useState(1)
  const { products, totalPages, loading, error } = useProducts({ page, limit: 10 })

  return (
    <div className="app">
      <h1>Products</h1>

      {error && <p className="error">Something went wrong: {error.message}</p>}

      {loading ? (
        <div className="loader">
          <div className="spinner" />
          <p>Loading products…</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                className="product-img"
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h2 className="product-name">{product.title}</h2>
                <p className="product-desc">{product.description}</p>
                <div className="product-pricing">
                  <span className="product-price">${product.price}</span>
                  {product.discountPercentage > 0 && (
                    <span className="product-discount">
                      -{product.discountPercentage}%
                    </span>
                  )}
                </div>
                <div className="product-footer">
                  <span className="product-rating">
                    {'★'.repeat(Math.round(product.rating))}
                    {'☆'.repeat(5 - Math.round(product.rating))}
                    <span className="rating-num"> {product.rating}</span>
                  </span>
                  <span className="product-stock">{product.stock} in stock</span>
                </div>
              </div>
            </div>
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
