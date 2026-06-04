import mongoose from "mongoose";

const recipeSchema =
  new mongoose.Schema(
    {
      id: {
        type: Number,
        required: true,
        unique: true,
        index: true
      },

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

      ingredientes: {
        type: [String],
        required: true,
        validate: {
          validator: (value) =>
            Array.isArray(value) &&
            value.length > 0,
          message:
            "Debe agregar al menos un ingrediente"
        }
      },

      instrucciones: {
        type: String,
        required: true,
        trim: true
      },

      categoria: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
      },

      imagen: {
        type: String,
        trim: true,
        default: ""
      },

      autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    },
    {
      timestamps: true
    }
  );

export default mongoose.model(
  "Recipe",
  recipeSchema
);
