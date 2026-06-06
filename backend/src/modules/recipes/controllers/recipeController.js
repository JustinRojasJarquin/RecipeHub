import {
  createRecipe,
  deleteRecipe,
  getRecipeById,
  getRecipes,
  updateRecipe
} from "../services/recipeService.js";

export const listRecipes = async (req, res) => {
  try {
    const recipes = await getRecipes({
      category: req.query.categoria || req.query.category,
      difficulty: req.query.dificultad || req.query.difficulty,
      tags: req.query.tags,
      query: req.query.q || req.query.query,
      autorId: req.query.autorId
    });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showRecipe = async (req, res) => {
  try {
    const recipe = await getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ message: "ID de receta invalido" });
  }
};

export const storeRecipe = async (req, res) => {
  try {
    const recipe = await createRecipe(req.body, req.user._id);
    res.status(201).json({ message: "Receta creada correctamente", recipe });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const editRecipe = async (req, res) => {
  try {
    const recipe = await getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }
    if (recipe.autorId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No tienes permiso para editar esta receta" });
    }
    const updated = await updateRecipe(req.params.id, req.body);
    res.status(200).json({ message: "Receta actualizada correctamente", recipe: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeRecipe = async (req, res) => {
  try {
    const recipe = await getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }
    if (recipe.autorId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No tienes permiso para eliminar esta receta" });
    }
    await deleteRecipe(req.params.id);
    res.status(200).json({ message: "Receta eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
