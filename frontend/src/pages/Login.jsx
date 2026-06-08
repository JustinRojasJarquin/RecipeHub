import { useState } from "react";
import { ChefHat } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

function Login({ onSwitch }) {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(form);
      loginUser(data.user, data.token);
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Credenciales inválidas");
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <ChefHat size={58} className="text-orange-500" />
        <h1>RecipeHub</h1>
        <p>Bienvenido nuevamente</p>
      </div>

      <form className="stack" onSubmit={handleSubmit}>
        <label className="field">
          <span>Correo electrónico</span>
          <input
            type="email"
            name="email"
            placeholder="tu@email.com"
            onChange={handleChange}
            required
          />
        </label>

        <label className="field">
          <span>Contraseña</span>
          <input
            type="password"
            name="password"
            placeholder="Tu contraseña"
            onChange={handleChange}
            required
          />
        </label>

        <button className="button" type="submit">
          Iniciar sesión
        </button>
      </form>

      <p className="auth-switch">
        ¿No tienes cuenta?{" "}
        <button type="button" onClick={onSwitch}>
          Regístrate aquí
        </button>
      </p>
    </div>
  );
}

export default Login;
