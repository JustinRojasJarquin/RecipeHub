import { Link } from "react-router-dom";
import { ChefHat, Clock, Users } from "lucide-react";

function RecipeCard({ recipe }) {
  return (
    <article className="card recipe-card">
      {recipe.image ? (
        <img src={recipe.image} alt={recipe.title} className="card-image" />
      ) : (
        <div className="card-image card-image-placeholder">
          <ChefHat size={42} aria-hidden="true" />
          <span>Sin imagen</span>
        </div>
      )}
      <div className="card-body">
        <div className="card-heading">
          <p className="eyebrow">{recipe.category}</p>
          <span className="difficulty-pill">{recipe.difficulty}</span>
        </div>
        <h3>{recipe.title}</h3>
        <p className="recipe-description">{recipe.description}</p>
        <ul className="meta-list">
          {recipe.prepTime > 0 && (
            <li>
              <Clock size={16} aria-hidden="true" /> {recipe.prepTime} min
            </li>
          )}
          {recipe.porciones > 0 && (
            <li>
              <Users size={16} aria-hidden="true" /> {recipe.porciones} porc.
            </li>
          )}
        </ul>
        <Link className="button" to={`/recipes/${recipe.id}`}>
          Ver receta
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;
