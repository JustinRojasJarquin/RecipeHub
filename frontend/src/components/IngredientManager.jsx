function IngredientManager({ ingredients, onChange }) {
  const update = (index, field, value) => {
    const next = ingredients.map((ing, i) =>
      i === index ? { ...ing, [field]: value } : ing
    );
    onChange(next);
  };

  const add = () => {
    onChange([...ingredients, { nombre: "", cantidad: "", unidad: "" }]);
  };

  const remove = (index) => {
    onChange(ingredients.filter((_, i) => i !== index));
  };

  return (
    <section className="panel stack">
      <div className="panel-header">
        <h3>Ingredientes</h3>
        <button type="button" className="button secondary" onClick={add}>
          + Añadir
        </button>
      </div>

      {ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient-row">
          <input
            type="text"
            placeholder="Nombre (ej. harina)"
            value={ingredient.nombre}
            onChange={(e) => update(index, "nombre", e.target.value)}
            className="ingredient-field"
          />
          <input
            type="number"
            placeholder="Cantidad"
            min="0"
            step="0.01"
            value={ingredient.cantidad}
            onChange={(e) => update(index, "cantidad", e.target.value)}
            className="ingredient-field ingredient-cantidad"
          />
          <input
            type="text"
            placeholder="Unidad (ej. tazas)"
            value={ingredient.unidad}
            onChange={(e) => update(index, "unidad", e.target.value)}
            className="ingredient-field"
          />
          <button
            type="button"
            className="ghost-button"
            onClick={() => remove(index)}
            disabled={ingredients.length === 1}
          >
            Eliminar
          </button>
        </div>
      ))}
    </section>
  );
}

export default IngredientManager;
