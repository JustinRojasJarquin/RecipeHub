import mongoose from "mongoose";

const ingredienteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    cantidad: { type: Number, required: true },
    unidad: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true
    },

    descripcion: {
      type: String,
      trim: true,
      default: ""
    },

    categoria: {
      type: String,
      required: true,
      trim: true
    },

    tiempoMin: {
      type: Number,
      required: true,
      min: 1
    },

    porciones: {
      type: Number,
      required: true,
      min: 1
    },

    dificultad: {
      type: String,
      required: true,
      enum: ["Fácil", "Media", "Difícil"],
      trim: true
    },

    ingredientes: {
      type: [ingredienteSchema],
      required: true,
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "Debe agregar al menos un ingrediente"
      }
    },

    pasos: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "Debe agregar al menos un paso"
      }
    },

    tags: {
      type: [String],
      default: []
    },

    imagenUrl: {
      type: String,
      trim: true,
      default: ""
    },

    autorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Recipe", recipeSchema);
