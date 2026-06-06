import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { getRecipeById, updateRecipe } from "../services/recipeService";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipe = useCallback(async () => {
    try {
      const recipe = await getRecipeById(id);
      setFormData({
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        prepTime: recipe.prepTime,
        porciones: recipe.porciones,
        difficulty: recipe.difficulty,
        ingredients: recipe.ingredients.length
          ? recipe.ingredients
          : [{ nombre: "", cantidad: "", unidad: "" }],
        steps: recipe.steps.length ? recipe.steps : [""],
        image: recipe.image,
        tags: recipe.tags,
      });
    } catch {
      setError("No se pudo cargar la receta.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await updateRecipe(id, formData);
      navigate(`/recipes/${id}`);
    } catch (err) {
      setError(
        err.response?.data?.message || "No se pudo actualizar la receta."
      );
      setSubmitting(false);
    }
  };

  if (loading) return <p className="page-shell">Cargando receta...</p>;
  if (error && !formData) return <p className="page-shell" style={{ color: "red" }}>{error}</p>;
  if (!formData) return <p className="page-shell">Receta no encontrada.</p>;

  return (
    <main className="page-shell stack">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">Editar receta</p>
          <h1>Actualiza los detalles de tu receta</h1>
        </div>
      </header>

      {error && (
        <p className="panel" style={{ color: "red" }}>{error}</p>
      )}

      <RecipeForm
        formData={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        submitLabel={submitting ? "Guardando..." : "Actualizar receta"}
        disabled={submitting}
      />
    </main>
  );
}

export default EditRecipe;
