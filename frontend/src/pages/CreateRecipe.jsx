import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RecipeForm from '../components/RecipeForm'
import { createRecipe } from '../services/recipeService'

function CreateRecipe() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Cena',
    prepTime: 15,
    difficulty: 'Fácil',
    ingredients: [''],
    steps: [''],
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80',
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const recipe = {
      ...formData,
      ingredients: formData.ingredients.filter(Boolean),
      steps: formData.steps.filter(Boolean),
    }

    createRecipe(recipe)
    navigate('/')
  }

  return (
    <main className="page-shell stack">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">Nueva receta</p>
          <h1>Crea una receta desde cero</h1>
          <p>Este formulario sirve como base para la versión final del módulo de recetas.</p>
        </div>
      </header>

      <RecipeForm formData={formData} onChange={setFormData} onSubmit={handleSubmit} submitLabel="Crear receta" />
    </main>
  )
}

export default CreateRecipe
