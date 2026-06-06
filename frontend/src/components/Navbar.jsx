import { Link, useNavigate } from "react-router-dom";
import { ChefHat } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link to={user ? "/home" : "/login"} className="flex items-center gap-2">
          <ChefHat size={32} className="text-orange-500" />
          <span className="text-2xl font-bold text-orange-600">RecipeHub</span>
        </Link>

        <div className="flex gap-6 items-center">
          {user ? (
            <>
              <Link to="/home" className="hover:text-orange-500">
                Recetas
              </Link>
              <Link to="/recipes/new" className="hover:text-orange-500">
                Nueva receta
              </Link>
              <Link to="/profile" className="hover:text-orange-500">
                Perfil
              </Link>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-orange-500">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
