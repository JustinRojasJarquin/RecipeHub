function RatingStars({ value, onChange, readOnly = false }) {
  return (
    <div className="stars" role="radiogroup" aria-label="Calificación">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readOnly && onChange(star)}
          className={star <= value ? "star active" : "star"}
          aria-label={`${star} estrellas`}
          style={readOnly ? { cursor: "default" } : undefined}
          tabIndex={readOnly ? -1 : 0}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default RatingStars;
