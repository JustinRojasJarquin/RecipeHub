import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/routes/authRoutes.js";
import recipeRoutes from "./modules/recipes/routes/recipeRoutes.js";
import commentRoutes from "./modules/comments/routes/commentRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/recetas",
  recipeRoutes
);

app.use("/api", commentRoutes);

export default app;
