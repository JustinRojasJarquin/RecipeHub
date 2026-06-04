import { useState } from "react";
import { ChefHat } from "lucide-react";
import { register } from "../services/authService";

function Register({ onSwitch }) {

  const [form, setForm] = useState({
    name: "",
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

      await register(form);

      alert(
        "Usuario registrado correctamente"
      );

      onSwitch();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Error al registrarse"
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
          Crea tu cuenta
        </p>

      </div>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Nombre"
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
          Crear Cuenta
        </button>

      </form>

      <p className="text-center mt-6 text-gray-600">

        ¿Ya tienes cuenta?{" "}

        <button
          type="button"
          onClick={onSwitch}
          className="
            text-orange-500
            font-semibold
            hover:text-orange-700
          "
        >
          Inicia sesión
        </button>

      </p>

    </div>
  );
}

export default Register;