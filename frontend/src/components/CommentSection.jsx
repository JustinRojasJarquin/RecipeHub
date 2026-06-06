import { useState } from 'react'
import CommentForm from './CommentForm'
import { addComment, deleteComment, getComments } from '../services/commentService'

function CommentSection({ recipeId }) {
  const [comments, setComments] = useState(() => getComments(recipeId))

  const refreshComments = () => {
    setComments(getComments(recipeId))
  }

  const handleSubmit = (comment) => {
    addComment(recipeId, comment)
    refreshComments()
  }

  const handleDelete = (commentId) => {
    deleteComment(recipeId, commentId)
    refreshComments()
  }

  return (
    <section className="stack">
      <CommentForm onSubmit={handleSubmit} />

      <article className="panel">
        <h3>Comentarios ({comments.length})</h3>
        {comments.length === 0 ? (
          <p>No hay comentarios todavía.</p>
        ) : (
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment-card">
                <div>
                  <strong>{comment.author}</strong>
                  <p>{comment.text}</p>
                </div>
                <div className="comment-actions">
                  <span>⭐ {comment.rating}/5</span>
                  <button type="button" className="ghost-button" onClick={() => handleDelete(comment.id)}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  )
}

export default CommentSection
