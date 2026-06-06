const mockRecipes = [
  {
    id: 1,
    title: 'Tacos de pollo y aguacate',
    description: 'Una receta fácil para una cena rápida con sabor fresco.',
    category: 'Cena',
    prepTime: 20,
    difficulty: 'Fácil',
    ingredients: ['Tortillas', 'Pollo', 'Aguacate', 'Cebolla', 'Limón'],
    steps: ['Cocina el pollo con especias.', 'Sirve en tortillas con aguacate y cebolla.', 'Termina con limón.'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
    rating: 4.5,
  },
  {
    id: 2,
    title: 'Ensalada mediterránea',
    description: 'Ligera, colorida y perfecta para el almuerzo.',
    category: 'Almuerzo',
    prepTime: 15,
    difficulty: 'Fácil',
    ingredients: ['Tomate', 'Pepino', 'Queso feta', 'Aceitunas', 'Olivo'],
    steps: ['Corta todos los vegetales.', 'Mezcla y añade feta y aceitunas.', 'Aliña con aceite de oliva.'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    rating: 4.2,
  },
]

let recipes = [...mockRecipes]

export const getRecipes = (filters = {}) => {
  return recipes.filter((recipe) => {
    const matchesQuery = filters.query
      ? recipe.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(filters.query.toLowerCase())
      : true

    const matchesCategory = filters.category && filters.category !== 'Todas'
      ? recipe.category === filters.category
      : true

    const matchesDifficulty = filters.difficulty && filters.difficulty !== 'Todas'
      ? recipe.difficulty === filters.difficulty
      : true

    return matchesQuery && matchesCategory && matchesDifficulty
  })
}

export const getRecipeById = (id) => recipes.find((recipe) => recipe.id === Number(id)) || null

export const createRecipe = (recipe) => {
  const newRecipe = {
    id: Date.now(),
    ...recipe,
    rating: recipe.rating || 0,
  }

  recipes = [newRecipe, ...recipes]
  return newRecipe
}

export const updateRecipe = (id, recipe) => {
  recipes = recipes.map((item) => (item.id === Number(id) ? { ...item, ...recipe } : item))
  return getRecipeById(id)
}

export const deleteRecipe = (id) => {
  recipes = recipes.filter((recipe) => recipe.id !== Number(id))
}
