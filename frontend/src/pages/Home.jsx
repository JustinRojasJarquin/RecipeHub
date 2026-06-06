import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import { getRecipes } from '../services/recipeService'

function Home() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todas')
  const [difficulty, setDifficulty] = useState('Todas')

  const recipes = useMemo(
    () => getRecipes({ query, category, difficulty }),
    [query, category, difficulty],
  )

  return (
    <main className="page-shell">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">RecipeHub</p>
          <h1>Explora recetas y comparte tu opinión</h1>
          <p>Esta vista inicial sirve de base para la parte de recetas y comentarios que seguirá Angélica.</p>
        </div>
        <Link className="button" to="/recipes/new">Crear receta</Link>
      </header>

      <section className="panel stack">
        <SearchBar value={query} onChange={setQuery} />
        <FilterBar
          category={category}
          difficulty={difficulty}
          onCategoryChange={setCategory}
          onDifficultyChange={setDifficulty}
        />
      </section>

      <section className="cards-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </section>
    </main>
  )
}

export default Home
