import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import RecipeDetail from "../pages/RecipeDetail";
import CreateRecipe from "../pages/CreateRecipe";
import EditRecipe from "../pages/EditRecipe";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Auth />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recipes/:id"
        element={
          <ProtectedRoute>
            <RecipeDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recipes/new"
        element={
          <ProtectedRoute>
            <CreateRecipe />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recipes/:id/edit"
        element={
          <ProtectedRoute>
            <EditRecipe />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;
