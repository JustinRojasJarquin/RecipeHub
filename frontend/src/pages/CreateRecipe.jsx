import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { createRecipe } from "../services/recipeService";

function CreateRecipe() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Cena",
    prepTime: 15,
    porciones: 2,
    difficulty: "Fácil",
    ingredients: [{ nombre: "", cantidad: "", unidad: "" }],
    steps: [""],
    image: "",
    tags: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const recipe = await createRecipe(formData);
      navigate(`/recipes/${recipe.id}`);
    } catch (err) {
      setError(
        err.response?.data?.message || "No se pudo crear la receta. Intenta de nuevo."
      );
      setSubmitting(false);
    }
  };

  return (
    <main className="page-shell stack">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">Nueva receta</p>
          <h1>Crea una receta desde cero</h1>
        </div>
      </header>

      {error && (
        <p className="panel" style={{ color: "red" }}>{error}</p>
      )}

      <RecipeForm
        formData={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        submitLabel={submitting ? "Creando..." : "Crear receta"}
        disabled={submitting}
      />
    </main>
  );
}

export default CreateRecipe;
