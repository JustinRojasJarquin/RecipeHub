import {
  createComment,
  deleteComment,
  getAverageRating,
  getCommentsByRecipe
} from "../services/commentService.js";

export const listComments = async (req, res) => {
  try {
    const comments = await getCommentsByRecipe(req.params.id);

    if (comments === null) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }

    const promedio = await getAverageRating(req.params.id);

    res.status(200).json({ comments, promedio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const storeComment = async (req, res) => {
  try {
    const comment = await createComment(
      req.params.id,
      req.body,
      req.user._id
    );

    if (comment === null) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }

    const populated = await comment.populate("usuario", "name");

    res.status(201).json({
      message: "Comentario agregado correctamente",
      comment: populated
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeComment = async (req, res) => {
  try {
    const comment = await deleteComment(req.params.id, req.user._id);

    if (!comment) {
      return res.status(404).json({
        message: "Comentario no encontrado o no tienes permiso para eliminarlo"
      });
    }

    res.status(200).json({ message: "Comentario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
