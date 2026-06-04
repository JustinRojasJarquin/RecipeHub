import Recipe from "../models/recipe.js";

const getNextRecipeId = async () => {
  const lastRecipe =
    await Recipe.findOne()
      .sort({ id: -1 })
      .select("id");

  return lastRecipe ? lastRecipe.id + 1 : 1;
};

const formatCategory = (category) => {
  if (!category) {
    return undefined;
  }

  return category.trim().toLowerCase();
};

export const getRecipes = async (
  category
) => {
  const filter = {};
  const formattedCategory =
    formatCategory(category);

  if (formattedCategory) {
    filter.categoria = formattedCategory;
  }

  return Recipe.find(filter)
    .populate("autor", "name email")
    .sort({ id: 1 });
};

export const getRecipeById = async (
  id
) => {
  return Recipe.findOne({ id })
    .populate("autor", "name email");
};

export const createRecipe = async (
  recipeData,
  userId
) => {
  const id = await getNextRecipeId();

  return Recipe.create({
    ...recipeData,
    id,
    categoria: formatCategory(
      recipeData.categoria
    ),
    autor: userId
  });
};

export const updateRecipe = async (
  id,
  recipeData
) => {
  const dataToUpdate = {
    ...recipeData
  };

  delete dataToUpdate.id;
  delete dataToUpdate._id;
  delete dataToUpdate.autor;

  if (dataToUpdate.categoria) {
    dataToUpdate.categoria =
      formatCategory(
        dataToUpdate.categoria
      );
  }

  return Recipe.findOneAndUpdate(
    { id },
    dataToUpdate,
    {
      new: true,
      runValidators: true
    }
  ).populate("autor", "name email");
};

export const deleteRecipe = async (
  id
) => {
  return Recipe.findOneAndDelete({
    id
  });
};
