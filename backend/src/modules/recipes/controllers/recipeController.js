import {
  createRecipe,
  deleteRecipe,
  getRecipeById,
  getRecipes,
  updateRecipe
} from "../services/recipeService.js";

const parseRecipeId = (id) => {
  const recipeId = Number(id);

  if (
    !Number.isInteger(recipeId) ||
    recipeId <= 0
  ) {
    throw new Error(
      "El id de la receta debe ser un numero valido"
    );
  }

  return recipeId;
};

export const listRecipes = async (
  req,
  res
) => {
  try {
    const recipes = await getRecipes(
      req.query.categoria ||
        req.query.category
    );

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const showRecipe = async (
  req,
  res
) => {
  try {
    const id = parseRecipeId(
      req.params.id
    );

    const recipe =
      await getRecipeById(id);

    if (!recipe) {
      return res.status(404).json({
        message:
          "Receta no encontrada"
      });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const storeRecipe = async (
  req,
  res
) => {
  try {
    const recipe =
      await createRecipe(
        req.body,
        req.user._id
      );

    res.status(201).json({
      message:
        "Receta creada correctamente",
      recipe
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const editRecipe = async (
  req,
  res
) => {
  try {
    const id = parseRecipeId(
      req.params.id
    );

    const recipe =
      await updateRecipe(
        id,
        req.body
      );

    if (!recipe) {
      return res.status(404).json({
        message:
          "Receta no encontrada"
      });
    }

    res.status(200).json({
      message:
        "Receta actualizada correctamente",
      recipe
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const removeRecipe = async (
  req,
  res
) => {
  try {
    const id = parseRecipeId(
      req.params.id
    );

    const recipe =
      await deleteRecipe(id);

    if (!recipe) {
      return res.status(404).json({
        message:
          "Receta no encontrada"
      });
    }

    res.status(200).json({
      message:
        "Receta eliminada correctamente"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
