import express from "express";
import {
  editRecipe,
  listRecipes,
  removeRecipe,
  showRecipe,
  storeRecipe
} from "../controllers/recipeController.js";
import { protect } from "../../../middleware/authMiddleware.js";
import {
  createRecipeValidation,
  handleValidationErrors,
  updateRecipeValidation
} from "../validators/recipeValidator.js";

const router = express.Router();

router.get("/", listRecipes);
router.get("/:id", showRecipe);

router.post("/", protect, createRecipeValidation, handleValidationErrors, storeRecipe);
router.put("/:id", protect, updateRecipeValidation, handleValidationErrors, editRecipe);
router.delete("/:id", protect, removeRecipe);

export default router;
