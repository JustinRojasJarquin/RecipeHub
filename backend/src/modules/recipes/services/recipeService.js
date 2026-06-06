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

const formatTextArray = (value) => {
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) =>
      typeof item === "string" ? item.trim() : item
    )
    .filter(Boolean);
};

// Prepares recipe data so arrays, filters, and steps keep a consistent format.
const normalizeRecipeData = (recipeData) => {
  const normalized = {
    ...recipeData
  };

  if (normalized.categoria) {
    normalized.categoria =
      formatCategory(normalized.categoria);
  }

  if (normalized.dificultad) {
    normalized.dificultad =
      normalized.dificultad.trim().toLowerCase();
  }

  if (normalized.ingredientes) {
    normalized.ingredientes = formatTextArray(
      normalized.ingredientes
    );
  }

  if (normalized.pasos) {
    normalized.pasos = formatTextArray(
      normalized.pasos
    );
  }

  if (normalized.tags) {
    normalized.tags = formatTextArray(
      normalized.tags
    ).map((tag) => tag.toLowerCase());
  }

  if (
    !normalized.instrucciones &&
    Array.isArray(normalized.pasos) &&
    normalized.pasos.length > 0
  ) {
    normalized.instrucciones =
      normalized.pasos.join("\n");
  }

  if (
    normalized.instrucciones &&
    (!Array.isArray(normalized.pasos) ||
      normalized.pasos.length === 0)
  ) {
    normalized.pasos = normalized.instrucciones
      .split("\n")
      .map((step) => step.trim())
      .filter(Boolean);
  }

  return normalized;
};

// Builds the recipe query using the optional filters sent by the client.
export const getRecipes = async ({
  category,
  difficulty,
  tags
} = {}) => {
  const filter = {};
  const formattedCategory =
    formatCategory(category);

  if (formattedCategory) {
    filter.categoria = formattedCategory;
  }

  if (difficulty) {
    filter.dificultad =
      difficulty.trim().toLowerCase();
  }

  const formattedTags = formatTextArray(tags)
    .map((tag) => tag.toLowerCase());

  if (formattedTags.length > 0) {
    filter.tags = {
      $all: formattedTags
    };
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

// Saves a new recipe with a sequential public id and the creator user id.
export const createRecipe = async (
  recipeData,
  userId
) => {
  const id = await getNextRecipeId();
  const normalizedData =
    normalizeRecipeData(recipeData);

  return Recipe.create({
    ...normalizedData,
    id,
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

  const normalizedData =
    normalizeRecipeData(dataToUpdate);

  return Recipe.findOneAndUpdate(
    { id },
    normalizedData,
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
