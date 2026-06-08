import IngredientManager from "./IngredientManager";
import StepManager from "./StepManager";

function RecipeForm({
  formData,
  onChange,
  onSubmit,
  submitLabel = "Guardar receta",
  disabled = false,
}) {
  const updateField = (field, value) => onChange({ ...formData, [field]: value });

  return (
    <form className="stack" onSubmit={onSubmit}>
      <section className="panel stack">
        <h2>Información básica</h2>

        <label className="field">
          <span>Título</span>
          <input
            type="text"
            value={formData.title}
            onChange={(event) => updateField("title", event.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Descripción</span>
          <textarea
            rows="3"
            value={formData.description}
            onChange={(event) => updateField("description", event.target.value)}
            required
          />
        </label>

        <div className="filters-grid">
          <label className="field">
            <span>Categoría</span>
            <input
              type="text"
              value={formData.category}
              onChange={(event) => updateField("category", event.target.value)}
              required
            />
          </label>

          <label className="field">
            <span>Tiempo (min)</span>
            <input
              type="number"
              min="1"
              value={formData.prepTime}
              onChange={(event) => updateField("prepTime", Number(event.target.value))}
              required
            />
          </label>

          <label className="field">
            <span>Porciones</span>
            <input
              type="number"
              min="1"
              value={formData.porciones}
              onChange={(event) => updateField("porciones", Number(event.target.value))}
              required
            />
          </label>

          <label className="field">
            <span>Dificultad</span>
            <select
              value={formData.difficulty}
              onChange={(event) => updateField("difficulty", event.target.value)}
            >
              <option>Fácil</option>
              <option>Media</option>
              <option>Difícil</option>
            </select>
          </label>
        </div>
      </section>

      <section className="panel stack">
        <h2>Imagen</h2>
        <label className="field">
          <span>Imagen (URL)</span>
          <input
            type="url"
            value={formData.image}
            onChange={(event) => updateField("image", event.target.value)}
            placeholder="https://ejemplo.com/receta.jpg"
          />
        </label>
        {formData.image && (
          <img className="detail-image form-preview" src={formData.image} alt="Vista previa" />
        )}
      </section>

      <IngredientManager
        ingredients={formData.ingredients}
        onChange={(ingredients) => updateField("ingredients", ingredients)}
      />

      <StepManager steps={formData.steps} onChange={(steps) => updateField("steps", steps)} />

      <button type="submit" className="button submit-button" disabled={disabled}>
        {submitLabel}
      </button>
    </form>
  );
}

export default RecipeForm;
