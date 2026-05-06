import { useState } from 'react'
import './App.css'
import { useMeals } from './hooks/useMeals'

function getIngredients(meal) {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure: measure?.trim() || '' })
    }
  }
  return ingredients
}

function App() {
  const [page, setPage] = useState(1)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const { meals, totalPages, loading, error } = useMeals({ page, limit: 10 })

  if (selectedMeal) {
    const ingredients = getIngredients(selectedMeal)
    return (
      <div className="app">
        <button className="back-btn" onClick={() => setSelectedMeal(null)}>
          ← Back to meals
        </button>

        <div className="detail">
          <img
            className="detail-img"
            src={selectedMeal.strMealThumb}
            alt={selectedMeal.strMeal}
          />
          <div className="detail-header">
            <h1>{selectedMeal.strMeal}</h1>
            <div className="detail-tags">
              <span className="tag">{selectedMeal.strCategory}</span>
              <span className="tag">{selectedMeal.strArea}</span>
              {selectedMeal.strTags &&
                selectedMeal.strTags.split(',').map((t) => (
                  <span key={t} className="tag">{t.trim()}</span>
                ))}
            </div>
          </div>

          <div className="detail-section">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {ingredients.map((item, i) => (
                <li key={i}>
                  <span className="ingredient-name">{item.ingredient}</span>
                  <span className="ingredient-measure">{item.measure}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h2>Instructions</h2>
            <p className="instructions">{selectedMeal.strInstructions}</p>
          </div>

          {selectedMeal.strYoutube && (
            <a
              className="yt-link"
              href={selectedMeal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶ Watch on YouTube
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <h1>Meals</h1>

      {error && <p className="error">Something went wrong: {error.message}</p>}

      {loading ? (
        <div className="loader">
          <div className="spinner" />
          <p>Loading meals…</p>
        </div>
      ) : (
        <div className="meals-grid">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="meal-card"
              onClick={() => setSelectedMeal(meal)}
            >
              <img
                className="meal-img"
                src={meal.strMealThumb}
                alt={meal.strMeal}
              />
              <div className="meal-info">
                <h2 className="meal-name">{meal.strMeal}</h2>
                <div className="meal-meta">
                  <span className="tag">{meal.strCategory}</span>
                  <span className="tag">{meal.strArea}</span>
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
