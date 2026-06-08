import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import { getRecipes } from "../services/recipeService";

function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [difficulty, setDifficulty] = useState("Todas");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecipes({ query, category, difficulty });
      setRecipes(data);
    } catch {
      setError("No se pudieron cargar las recetas. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }, [query, category, difficulty]);

  useEffect(() => {
    const timeout = setTimeout(fetchRecipes, 300);
    return () => clearTimeout(timeout);
  }, [fetchRecipes]);

  const clearFilters = () => {
    setQuery("");
    setCategory("Todas");
    setDifficulty("Todas");
  };

  return (
    <main className="page-shell">
      <header className="hero-panel hero-home">
        <div className="hero-copy">
          <p className="eyebrow">RecipeHub</p>
          <h1>Explora recetas caseras y comparte tus favoritas</h1>
          <p>
            Encuentra ideas por categoría, tiempo y dificultad. También puedes
            publicar tus propias recetas para que otros las prueben.
          </p>
          <ul className="hero-stats" aria-label="Resumen de recetas">
            <li>
              <strong>{recipes.length}</strong>
              <span>recetas visibles</span>
            </li>
            <li>
              <strong>3</strong>
              <span>categorías base</span>
            </li>
            <li>
              <strong>5★</strong>
              <span>calificaciones</span>
            </li>
          </ul>
        </div>
        <div className="hero-actions">
          <Link className="button" to="/recipes/new">
            Crear receta
          </Link>
          <a className="button secondary" href="#recipes">
            Ver recetas
          </a>
        </div>
      </header>

      <section className="panel search-panel">
        <SearchBar value={query} onChange={setQuery} />
        <FilterBar
          category={category}
          difficulty={difficulty}
          onCategoryChange={setCategory}
          onDifficultyChange={setDifficulty}
          onClear={clearFilters}
        />
      </section>

      {loading && (
        <section className="cards-grid" aria-label="Cargando recetas">
          {[1, 2, 3].map((item) => (
            <article className="card recipe-card skeleton-card" key={item}>
              <div className="skeleton skeleton-image" />
              <div className="card-body">
                <div className="skeleton skeleton-line short" />
                <div className="skeleton skeleton-line" />
                <div className="skeleton skeleton-line" />
              </div>
            </article>
          ))}
        </section>
      )}

      {error && <p className="alert-message">{error}</p>}

      {!loading && !error && recipes.length === 0 && (
        <section className="empty-state">
          <h2>No se encontraron recetas</h2>
          <p>Prueba limpiando los filtros o publica una receta nueva.</p>
          <Link className="button" to="/recipes/new">
            Crear receta
          </Link>
        </section>
      )}

      {!loading && !error && (
        <section className="cards-grid" id="recipes">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </section>
      )}
    </main>
  );
}

export default Home;
