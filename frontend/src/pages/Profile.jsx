import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getMyRecipes } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";

function Profile() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const userId = user._id || user.id;

    getMyRecipes(userId)
      .then((data) => setRecipes(data))
      .catch(() => setError("No se pudieron cargar tus recetas."))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <main className="page-shell stack">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">Mi cuenta</p>
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
        </div>
        <Link className="button" to="/recipes/new">
          Nueva receta
        </Link>
      </header>

      <section className="panel stack">
        <h2>Mis recetas publicadas</h2>

        {loading && <p>Cargando tus recetas...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && recipes.length === 0 && (
          <p>
            Aún no has publicado ninguna receta.{" "}
            <Link to="/recipes/new" style={{ color: "#f97316", fontWeight: 700 }}>
              Crea la primera
            </Link>
          </p>
        )}

        {!loading && !error && recipes.length > 0 && (
          <div className="cards-grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;
