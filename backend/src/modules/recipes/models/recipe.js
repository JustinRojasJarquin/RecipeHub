import mongoose from "mongoose";

// Defines the recipe data, searchable filters, and creator reference.
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
        trim: true
      },

      pasos: {
        type: [String],
        default: []
      },

      categoria: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
      },

      dificultad: {
        type: String,
        required: true,
        enum: ["facil", "media", "dificil"],
        lowercase: true,
        trim: true
      },

      tags: {
        type: [String],
        default: []
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

// Each recipe must include either full instructions or individual steps.
recipeSchema.pre("validate", function validateRecipeSteps(next) {
  const hasInstructions =
    typeof this.instrucciones === "string" &&
    this.instrucciones.trim().length > 0;

  const hasSteps =
    Array.isArray(this.pasos) &&
    this.pasos.length > 0;

  if (!hasInstructions && !hasSteps) {
    this.invalidate(
      "pasos",
      "Debe agregar las instrucciones o al menos un paso"
    );
  }

  next();
});

export default mongoose.model(
  "Recipe",
  recipeSchema
);
