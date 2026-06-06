import express from "express";
import {
  listComments,
  removeComment,
  storeComment
} from "../controllers/commentController.js";
import { protect } from "../../../middleware/authMiddleware.js";
import {
  createCommentValidation,
  handleCommentValidationErrors
} from "../validators/commentValidator.js";

const router = express.Router();

// GET /api/recetas/:id/comentarios
router.get("/recetas/:id/comentarios", listComments);

// POST /api/recetas/:id/comentarios
router.post(
  "/recetas/:id/comentarios",
  protect,
  createCommentValidation,
  handleCommentValidationErrors,
  storeComment
);

// DELETE /api/comentarios/:id
router.delete("/comentarios/:id", protect, removeComment);

export default router;
