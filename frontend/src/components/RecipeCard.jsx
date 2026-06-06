import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <article className="card">
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className="card-image" />
      )}
      <div className="card-body">
        <p className="eyebrow">{recipe.category}</p>
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <ul className="meta-list">
          {recipe.prepTime > 0 && <li>⏱ {recipe.prepTime} min</li>}
          {recipe.porciones > 0 && <li>🍽 {recipe.porciones} porc.</li>}
          <li>🧑‍🍳 {recipe.difficulty}</li>
        </ul>
        <Link className="button" to={`/recipes/${recipe.id}`}>
          Ver receta
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;
