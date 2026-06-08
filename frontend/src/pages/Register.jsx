import { useState } from "react";
import { ChefHat } from "lucide-react";
import { register } from "../services/authService";

function Register({ onSwitch }) {
  const [form, setForm] = useState({
    name: "",
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
      await register(form);
      alert("Usuario registrado correctamente");
      onSwitch();
    } catch (error) {
      alert(error.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <ChefHat size={58} className="text-orange-500" />
        <h1>RecipeHub</h1>
        <p>Crea tu cuenta</p>
      </div>

      <form className="stack" onSubmit={handleSubmit}>
        <label className="field">
          <span>Nombre</span>
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            onChange={handleChange}
            required
          />
        </label>

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
            placeholder="Crea una contraseña"
            onChange={handleChange}
            required
          />
        </label>

        <button className="button" type="submit">
          Crear cuenta
        </button>
      </form>

      <p className="auth-switch">
        ¿Ya tienes cuenta?{" "}
        <button type="button" onClick={onSwitch}>
          Inicia sesión
        </button>
      </p>
    </div>
  );
}

export default Register;
