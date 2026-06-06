import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RecipeForm from '../components/RecipeForm'
import { getRecipeById, updateRecipe } from '../services/recipeService'

function EditRecipe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(() => {
    const recipe = getRecipeById(id)
    return recipe ? { ...recipe } : null
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const recipe = {
      ...formData,
      ingredients: formData.ingredients.filter(Boolean),
      steps: formData.steps.filter(Boolean),
    }

    updateRecipe(id, recipe)
    navigate(`/recipes/${id}`)
  }

  if (!formData) {
    return <p className="page-shell">Receta no encontrada.</p>
  }

  return (
    <main className="page-shell stack">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">Editar receta</p>
          <h1>Actualiza los detalles de tu receta</h1>
        </div>
      </header>

      <RecipeForm formData={formData} onChange={setFormData} onSubmit={handleSubmit} submitLabel="Actualizar receta" />
    </main>
  )
}

export default EditRecipe
