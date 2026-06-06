import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CommentSection from '../components/CommentSection'
import { deleteRecipe, getRecipeById } from '../services/recipeService'
import { getAverageRating } from '../services/commentService'

function RecipeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = getRecipeById(id)

  const averageRating = useMemo(() => getAverageRating(id), [id])

  if (!recipe) {
    return <p className="page-shell">Receta no encontrada.</p>
  }

  const handleDelete = () => {
    deleteRecipe(id)
    navigate('/')
  }

  return (
    <main className="page-shell stack">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">Detalle de receta</p>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
        </div>
        <div className="button-row">
          <Link className="button" to={`/recipes/${recipe.id}/edit`}>Editar</Link>
          <button type="button" className="button secondary" onClick={handleDelete}>Eliminar</button>
        </div>
      </header>

      <article className="detail-grid">
        <img src={recipe.image} alt={recipe.title} className="detail-image" />
        <div className="panel stack">
          <p><strong>Categoría:</strong> {recipe.category}</p>
          <p><strong>Tiempo:</strong> {recipe.prepTime} minutos</p>
          <p><strong>Dificultad:</strong> {recipe.difficulty}</p>
          <p><strong>Promedio:</strong> {averageRating.toFixed(1)} / 5 ⭐</p>
          <h3>Ingredientes</h3>
          <ul>{recipe.ingredients.map((item) => <li key={item}>{item}</li>)}</ul>
          <h3>Pasos</h3>
          <ol>{recipe.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        </div>
      </article>

      <CommentSection recipeId={id} />
    </main>
  )
}

export default RecipeDetail
