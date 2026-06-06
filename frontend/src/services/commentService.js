const mockComments = {
  1: [
    { id: 1, author: 'Angélica', text: 'Muy buena receta, fácil de seguir.', rating: 5 },
    { id: 2, author: 'Cris', text: 'Ideal para una cena rápida.', rating: 4 },
  ],
  2: [
    { id: 3, author: 'Mica', text: 'Perfecta para el almuerzo.', rating: 5 },
  ],
}

let comments = structuredClone(mockComments)

export const getComments = (recipeId) => comments[recipeId] || []

export const addComment = (recipeId, comment) => {
  const nextComment = {
    id: Date.now(),
    author: comment.author || 'Anónimo',
    text: comment.text,
    rating: Number(comment.rating) || 0,
  }

  comments = {
    ...comments,
    [recipeId]: [...(comments[recipeId] || []), nextComment],
  }

  return nextComment
}

export const deleteComment = (recipeId, commentId) => {
  comments = {
    ...comments,
    [recipeId]: (comments[recipeId] || []).filter((comment) => comment.id !== Number(commentId)),
  }
}

export const getAverageRating = (recipeId) => {
  const list = comments[recipeId] || []

  if (list.length === 0) {
    return 0
  }

  return list.reduce((sum, comment) => sum + comment.rating, 0) / list.length
}
