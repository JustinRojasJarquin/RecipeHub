import express from "express";

import {
  editRecipe,
  listRecipes,
  removeRecipe,
  showRecipe,
  storeRecipe
} from "../controllers/recipeController.js";

import {
  protect
} from "../../../middleware/authMiddleware.js";

const router =
  express.Router();

router.get("/", listRecipes);

router.get("/:id", showRecipe);

router.post("/", protect, storeRecipe);

router.put("/:id", protect, editRecipe);

router.delete(
  "/:id",
  protect,
  removeRecipe
);

export default router;
