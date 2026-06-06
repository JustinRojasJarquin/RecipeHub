<<<<<<< HEAD
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import AppRouter from "./router/AppRouter";
import { useAuth } from "./hooks/useAuth";

function App() {

  const { user } = useAuth();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const timer =
      setTimeout(() => {
        setLoading(false);
      }, 1800);

    return () =>
      clearTimeout(timer);

  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
      {user && <Navbar />}
      <AppRouter />
    </>
  );
=======
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import CreateRecipe from './pages/CreateRecipe'
import EditRecipe from './pages/EditRecipe'

function App() {
  return (
    <BrowserRouter>
      <nav className="topbar">
        <Link to="/">RecipeHub</Link>
        <Link className="button secondary" to="/recipes/new">Nueva receta</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/recipes/new" element={<CreateRecipe />} />
        <Route path="/recipes/:id/edit" element={<EditRecipe />} />
      </Routes>
    </BrowserRouter>
  )
>>>>>>> 072bf02 (Parte de Cris)
}

export default App;