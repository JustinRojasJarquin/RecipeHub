import { useCallback, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import RatingStars from "./RatingStars";
import { addComment, deleteComment, getComments } from "../services/commentService";
import { useAuth } from "../hooks/useAuth";

function CommentSection({ recipeId, onPromedioChange }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getComments(recipeId);
      setComments(data.comments);
      onPromedioChange?.(data.promedio);
    } catch {
      setError("No se pudieron cargar los comentarios.");
    } finally {
      setLoading(false);
    }
  }, [recipeId, onPromedioChange]);

  useEffect(() => {
    let active = true;

    const loadComments = async () => {
      if (active) await fetchComments();
    };

    loadComments();

    return () => {
      active = false;
    };
  }, [fetchComments]);

  const handleSubmit = async (comment) => {
    try {
      await addComment(recipeId, comment);
      await fetchComments();
    } catch (err) {
      alert(err.response?.data?.message || "No se pudo publicar el comentario.");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      await fetchComments();
    } catch {
      alert("No se pudo eliminar el comentario.");
    }
  };

  return (
    <section className="stack">
      {user && <CommentForm onSubmit={handleSubmit} />}

      <article className="panel stack">
        <div className="panel-header">
          <h2>Comentarios</h2>
          <span className="difficulty-pill">{comments.length}</span>
        </div>

        {loading && <p>Cargando comentarios...</p>}
        {error && <p className="alert-message">{error}</p>}

        {!loading && comments.length === 0 && (
          <p>No hay comentarios todavía. ¡Sé el primero!</p>
        )}

        {!loading && (
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment-card">
                <div>
                  <strong>{comment.author}</strong>
                  <p>{comment.text}</p>
                </div>
                <div className="comment-actions">
                  <RatingStars value={comment.rating} onChange={() => {}} readOnly />
                  {user && (user._id === comment.userId || user.id === comment.userId) && (
                    <button
                      type="button"
                      className="ghost-button"
                      onClick={() => handleDelete(comment.id)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}

export default CommentSection;
