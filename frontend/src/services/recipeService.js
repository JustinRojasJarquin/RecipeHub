import api from "./api";

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

const getAuthorName = (author) => {
  if (!author || typeof author === "string") return "Autor desconocido";
  return author.name || author.email || "Autor desconocido";
};

// Ingredientes vienen del backend como [{ nombre, cantidad, unidad }] y se usan tal cual.
const mapRecipeFromApi = (recipe) => ({
  id: recipe._id,
  title: recipe.titulo,
  description: recipe.descripcion,
  category: capitalize(recipe.categoria),
  difficulty: recipe.dificultad,
  ingredients: recipe.ingredientes || [],
  steps: recipe.pasos || [],
  tags: recipe.tags || [],
  image: recipe.imagenUrl || "",
  prepTime: recipe.tiempoMin || 0,
  porciones: recipe.porciones || 1,
  autor: recipe.autorId,
  authorName: getAuthorName(recipe.autorId),
  rating: 0,
});

const mapRecipeToApi = (recipe) => ({
  titulo: recipe.title,
  descripcion: recipe.description,
  categoria: recipe.category,
  dificultad: recipe.difficulty,
  ingredientes: (recipe.ingredients || []).filter((i) => i.nombre?.trim()),
  pasos: (recipe.steps || []).filter(Boolean),
  tags: recipe.tags || [],
  imagenUrl: recipe.image || "",
  tiempoMin: Number(recipe.prepTime) || 1,
  porciones: Number(recipe.porciones) || 1,
});

export const getRecipes = async (filters = {}) => {
  const params = {};
  if (filters.query) params.q = filters.query;
  if (filters.category && filters.category !== "Todas") {
    params.categoria = filters.category;
  }
  if (filters.difficulty && filters.difficulty !== "Todas") {
    params.dificultad = filters.difficulty;
  }

  const response = await api.get("/recetas", { params });
  return response.data.map(mapRecipeFromApi);
};

export const getRecipeById = async (id) => {
  const response = await api.get(`/recetas/${id}`);
  return mapRecipeFromApi(response.data);
};

export const createRecipe = async (recipe) => {
  const response = await api.post("/recetas", mapRecipeToApi(recipe));
  return mapRecipeFromApi(response.data.recipe);
};

export const updateRecipe = async (id, recipe) => {
  const response = await api.put(`/recetas/${id}`, mapRecipeToApi(recipe));
  return mapRecipeFromApi(response.data.recipe);
};

export const deleteRecipe = async (id) => {
  await api.delete(`/recetas/${id}`);
};

export const getMyRecipes = async (userId) => {
  const response = await api.get("/recetas", { params: { autorId: userId } });
  return response.data.map(mapRecipeFromApi);
};
