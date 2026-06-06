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

  return (
    <main className="page-shell">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">RecipeHub</p>
          <h1>Explora recetas y comparte tu opinión</h1>
        </div>
        <Link className="button" to="/recipes/new">
          Crear receta
        </Link>
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

      {loading && <p className="page-shell">Cargando recetas...</p>}

      {error && <p className="page-shell" style={{ color: "red" }}>{error}</p>}

      {!loading && !error && recipes.length === 0 && (
        <p className="page-shell">No se encontraron recetas.</p>
      )}

      {!loading && !error && (
        <section className="cards-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </section>
      )}
    </main>
  );
}

export default Home;
