import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    receta: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true
    },

    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    texto: {
      type: String,
      required: true,
      trim: true
    },

    calificacion: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Comment", commentSchema);
