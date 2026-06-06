import Recipe from "../models/recipe.js";

const formatTextArray = (value) => {
  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  if (!Array.isArray(value)) return [];
  return value.map((item) => (typeof item === "string" ? item.trim() : item)).filter(Boolean);
};

// Normalizes only pasos and tags; ingredientes are kept as-is (objects).
const normalizeRecipeData = (recipeData) => {
  const normalized = { ...recipeData };

  if (normalized.pasos) {
    normalized.pasos = formatTextArray(normalized.pasos);
  }

  if (normalized.tags) {
    normalized.tags = formatTextArray(normalized.tags).map((tag) => tag.toLowerCase());
  }

  return normalized;
};

export const getRecipes = async ({ category, difficulty, tags, query, autorId } = {}) => {
  const filter = {};

  if (category) {
    filter.categoria = new RegExp(`^${category.trim()}$`, "i");
  }

  if (difficulty) {
    filter.dificultad = difficulty.trim();
  }

  const formattedTags = formatTextArray(tags).map((tag) => tag.toLowerCase());
  if (formattedTags.length > 0) {
    filter.tags = { $all: formattedTags };
  }

  if (query && query.trim()) {
    const regex = new RegExp(query.trim(), "i");
    filter.$or = [{ titulo: regex }, { descripcion: regex }];
  }

  if (autorId) {
    filter.autorId = autorId;
  }

  return Recipe.find(filter).populate("autorId", "name email").sort({ createdAt: -1 });
};

export const getRecipeById = async (id) => {
  return Recipe.findById(id).populate("autorId", "name email");
};

export const createRecipe = async (recipeData, userId) => {
  const normalizedData = normalizeRecipeData(recipeData);
  return Recipe.create({ ...normalizedData, autorId: userId });
};

export const updateRecipe = async (id, recipeData) => {
  const dataToUpdate = { ...recipeData };
  delete dataToUpdate._id;
  delete dataToUpdate.autorId;

  const normalizedData = normalizeRecipeData(dataToUpdate);

  return Recipe.findByIdAndUpdate(id, normalizedData, {
    new: true,
    runValidators: true
  }).populate("autorId", "name email");
};

export const deleteRecipe = async (id) => {
  return Recipe.findByIdAndDelete(id);
};
