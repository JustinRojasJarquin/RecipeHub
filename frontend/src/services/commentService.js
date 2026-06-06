import api from "./api";

const mapComment = (comment) => ({
  id: comment._id,
  author: comment.usuario?.name || "Anónimo",
  userId: comment.usuario?._id,
  text: comment.texto,
  rating: comment.calificacion,
  createdAt: comment.createdAt,
});

export const getComments = async (recipeId) => {
  const response = await api.get(`/recetas/${recipeId}/comentarios`);
  return {
    comments: response.data.comments.map(mapComment),
    promedio: response.data.promedio,
  };
};

export const addComment = async (recipeId, comment) => {
  const response = await api.post(`/recetas/${recipeId}/comentarios`, {
    texto: comment.text,
    calificacion: comment.rating,
  });
  return mapComment(response.data.comment);
};

export const deleteComment = async (commentId) => {
  await api.delete(`/comentarios/${commentId}`);
};
