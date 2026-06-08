function SearchBar({ value, onChange }) {
  return (
    <label className="field search-field">
      <span>Buscar receta</span>
      <input
        type="search"
        placeholder="Ej. ensalada, tacos, pasta..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default SearchBar;
