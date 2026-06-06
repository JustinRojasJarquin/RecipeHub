function IngredientManager({ ingredients, onChange }) {
  const updateIngredient = (index, value) => {
    const next = [...ingredients]
    next[index] = value
    onChange(next)
  }

  const addIngredient = () => {
    onChange([...ingredients, ''])
  }

  const removeIngredient = (index) => {
    onChange(ingredients.filter((_, itemIndex) => itemIndex !== index))
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Ingredientes</h3>
        <button type="button" className="button secondary" onClick={addIngredient}>+ Añadir</button>
      </div>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="inline-field">
          <input
            type="text"
            value={ingredient}
            onChange={(event) => updateIngredient(index, event.target.value)}
            placeholder="Ej. 2 tomates"
          />
          <button type="button" className="ghost-button" onClick={() => removeIngredient(index)}>Eliminar</button>
        </div>
      ))}
    </section>
  )
}

export default IngredientManager
