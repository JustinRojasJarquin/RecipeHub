import Comment from "../models/Comment.js";
import Recipe from "../../recipes/models/recipe.js";

export const getCommentsByRecipe = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) return null;

  return Comment.find({ receta: recipe._id })
    .populate("usuario", "name")
    .sort({ createdAt: -1 });
};

export const createComment = async (recipeId, commentData, userId) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) return null;

  return Comment.create({
    receta: recipe._id,
    usuario: userId,
    texto: commentData.texto,
    calificacion: Number(commentData.calificacion)
  });
};

export const deleteComment = async (commentId, userId) => {
  return Comment.findOneAndDelete({ _id: commentId, usuario: userId });
};

export const getAverageRating = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) return 0;

  const result = await Comment.aggregate([
    { $match: { receta: recipe._id } },
    { $group: { _id: null, promedio: { $avg: "$calificacion" } } }
  ]);

  return result.length > 0 ? result[0].promedio : 0;
};
