function FilterBar({ category, difficulty, onCategoryChange, onDifficultyChange }) {
  return (
    <div className="filters-grid">
      <label className="field">
        <span>Categoría</span>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option>Todas</option>
          <option>Cena</option>
          <option>Almuerzo</option>
          <option>Postre</option>
        </select>
      </label>

      <label className="field">
        <span>Dificultad</span>
        <select value={difficulty} onChange={(event) => onDifficultyChange(event.target.value)}>
          <option>Todas</option>
          <option>Fácil</option>
          <option>Media</option>
          <option>Difícil</option>
        </select>
      </label>
    </div>
  )
}

export default FilterBar
