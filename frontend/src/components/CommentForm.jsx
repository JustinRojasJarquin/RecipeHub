import { useState } from "react";
import RatingStars from "./RatingStars";

function CommentForm({ onSubmit }) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    await onSubmit({ text, rating });
    setText("");
    setRating(5);
    setSubmitting(false);
  };

  return (
    <form className="panel stack" onSubmit={handleSubmit}>
      <h3>Deja tu opinión</h3>
      <label className="field">
        <span>Comentario</span>
        <textarea
          rows="3"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
          placeholder="Escribe tu comentario..."
        />
      </label>
      <label className="field">
        <span>Calificación</span>
        <RatingStars value={rating} onChange={setRating} />
      </label>
      <button type="submit" className="button" disabled={submitting}>
        {submitting ? "Publicando..." : "Publicar comentario"}
      </button>
    </form>
  );
}

export default CommentForm;
