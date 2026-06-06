function SearchBar({ value, onChange }) {
  return (
    <label className="field">
      <span>Buscar receta</span>
      <input
        type="search"
        placeholder="Ej. ensalada, tacos..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

export default SearchBar
