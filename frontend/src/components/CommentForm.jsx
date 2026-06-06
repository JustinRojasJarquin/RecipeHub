import { useState } from 'react'
import RatingStars from './RatingStars'

function CommentForm({ onSubmit }) {
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ author, text, rating })
    setAuthor('')
    setText('')
    setRating(5)
  }

  return (
    <form className="panel stack" onSubmit={handleSubmit}>
      <h3>Deja tu opinión</h3>
      <label className="field">
        <span>Nombre</span>
        <input value={author} onChange={(event) => setAuthor(event.target.value)} required />
      </label>
      <label className="field">
        <span>Comentario</span>
        <textarea
          rows="3"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        />
      </label>
      <label className="field">
        <span>Calificación</span>
        <RatingStars value={rating} onChange={setRating} />
      </label>
      <button type="submit" className="button">Publicar comentario</button>
    </form>
  )
}

export default CommentForm
