import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/routes/authRoutes.js";
import recipeRoutes from "./modules/recipes/routes/recipeRoutes.js";

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

export default app;
