function RatingStars({ value, onChange }) {
  return (
    <div className="stars" role="radiogroup" aria-label="Calificación">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={star <= value ? 'star active' : 'star'}
          aria-label={`Calificar con ${star} estrellas`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default RatingStars
