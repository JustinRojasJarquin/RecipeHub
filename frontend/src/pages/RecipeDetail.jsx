import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import { deleteRecipe, getRecipeById } from "../services/recipeService";
import { useAuth } from "../hooks/useAuth";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [recipe, setRecipe] = useState(null);
  const [promedio, setPromedio] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;

    const loadRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        if (!active) return;
        setRecipe(data);
        setError(null);
      } catch {
        if (active) setError("No se pudo cargar la receta.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadRecipe();

    return () => {
      active = false;
    };
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar esta receta?")) return;
    setDeleting(true);
    try {
      await deleteRecipe(id);
      navigate("/home");
    } catch {
      alert("No se pudo eliminar la receta.");
      setDeleting(false);
    }
  };

  const isAuthor =
    user && recipe?.autor && (
      recipe.autor._id === user._id ||
      recipe.autor._id === user.id ||
      recipe.autor === user._id ||
      recipe.autor === user.id
    );

  if (loading) return <p className="page-shell">Cargando receta...</p>;
  if (error) return <p className="page-shell alert-message">{error}</p>;
  if (!recipe) return <p className="page-shell">Receta no encontrada.</p>;

  return (
    <main className="page-shell stack">
      <header className="hero-panel detail-hero">
        <div>
          <p className="eyebrow">Detalle de receta</p>
          <h1>{recipe.title}</h1>
          <p className="recipe-author">Publicada por {recipe.authorName}</p>
          <p>{recipe.description}</p>
        </div>
        {isAuthor && (
          <div className="button-row">
            <Link className="button" to={`/recipes/${recipe.id}/edit`}>
              Editar
            </Link>
            <button
              type="button"
              className="button secondary"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        )}
      </header>

      <article className="detail-grid">
        {recipe.image && (
          <img src={recipe.image} alt={recipe.title} className="detail-image" />
        )}
        <div className="panel stack">
          <div className="recipe-facts">
            <span><strong>Categoría:</strong> {recipe.category}</span>
            {recipe.prepTime > 0 && <span><strong>Tiempo:</strong> {recipe.prepTime} min</span>}
            {recipe.porciones > 0 && <span><strong>Porciones:</strong> {recipe.porciones}</span>}
            <span><strong>Dificultad:</strong> {recipe.difficulty}</span>
            <span><strong>Promedio:</strong> {promedio.toFixed(1)} / 5 ★</span>
            <span><strong>Autor:</strong> {recipe.authorName}</span>
          </div>
          {recipe.tags?.length > 0 && (
            <p><strong>Tags:</strong> {recipe.tags.join(", ")}</p>
          )}
          <h2>Ingredientes</h2>
          <ul className="recipe-list">
            {recipe.ingredients.map((item, i) => (
              <li key={i}>
                {item.cantidad} {item.unidad} de {item.nombre}
              </li>
            ))}
          </ul>
          <h2>Pasos</h2>
          <ol className="recipe-list steps-list">
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </article>

      <CommentSection recipeId={id} onPromedioChange={setPromedio} />
    </main>
  );
}

export default RecipeDetail;
