import { useState } from "react";
import { ChefHat } from "lucide-react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login({ onSwitch }) {

  const navigate = useNavigate();

  const { loginUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data =
        await login(form);

      loginUser(
        data.user,
        data.token
      );

      navigate("/profile");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Credenciales inválidas"
      );
    }
  };

  return (
    <div
      className="
        bg-white
        shadow-2xl
        rounded-3xl
        p-10
        h-full
        border
        border-orange-100
      "
    >

      <div className="flex flex-col items-center mb-8">

        <ChefHat
          size={60}
          className="text-orange-500"
        />

        <h1 className="text-4xl font-bold text-orange-600 mt-3">
          RecipeHub
        </h1>

        <p className="text-gray-500 mt-2">
          Bienvenido nuevamente
        </p>

      </div>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="
            w-full
            border
            p-3
            rounded-xl
            mb-4
          "
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="
            w-full
            border
            p-3
            rounded-xl
            mb-6
          "
          onChange={handleChange}
        />

        <button
          className="
            w-full
            bg-orange-500
            hover:bg-orange-600
            text-white
            py-3
            rounded-xl
            font-semibold
          "
        >
          Iniciar Sesión
        </button>

      </form>

      <p className="text-center mt-6 text-gray-600">

        ¿No tienes cuenta?{" "}

        <button
          type="button"
          onClick={onSwitch}
          className="
            text-orange-500
            font-semibold
            hover:text-orange-700
          "
        >
          Regístrate aquí
        </button>

      </p>

    </div>
  );
}

export default Login;