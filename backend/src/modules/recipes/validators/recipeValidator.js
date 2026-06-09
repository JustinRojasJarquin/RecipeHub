import { body, validationResult } from "express-validator";

const ALLOWED_DIFFICULTIES = ["Fácil", "Media", "Difícil"];

const textField = (fieldName, message, { optional = false } = {}) => {
  const validator = body(fieldName);
  if (optional) validator.optional();
  return validator.trim().notEmpty().withMessage(message);
};

const positiveInt = (fieldName, message, { optional = false } = {}) => {
  const validator = body(fieldName);
  if (optional) validator.optional();
  return validator.isInt({ min: 1 }).withMessage(message);
};

const difficultyField = ({ optional = false } = {}) => {
  const validator = body("dificultad");
  if (optional) validator.optional();
  return validator
    .trim()
    .isIn(ALLOWED_DIFFICULTIES)
    .withMessage("La dificultad debe ser Fácil, Media o Difícil");
};

const stepsField = ({ optional = false } = {}) => {
  const base = optional ? body("pasos").optional() : body("pasos");
  return [
    base
      .isArray({ min: 1 })
      .withMessage("Debe agregar al menos un paso"),
    body("pasos.*")
      .trim()
      .notEmpty()
      .withMessage("Cada paso debe ser un texto no vacío")
  ];
};

const ingredientesField = ({ optional = false } = {}) => {
  const base = optional ? body("ingredientes").optional() : body("ingredientes");
  return [
    base
      .isArray({ min: 1 })
      .withMessage("Debe agregar al menos un ingrediente"),
    body("ingredientes.*.nombre")
      .trim()
      .notEmpty()
      .withMessage("El nombre de cada ingrediente es obligatorio"),
    body("ingredientes.*.cantidad")
      .isFloat({ min: 0.01 })
      .withMessage("La cantidad de cada ingrediente debe ser mayor a 0"),
    body("ingredientes.*.unidad")
      .trim()
      .notEmpty()
      .withMessage("La unidad de cada ingrediente es obligatoria")
  ];
};

export const createRecipeValidation = [
  textField("titulo", "El título es obligatorio"),
  textField("descripcion", "La descripción es obligatoria"),
  textField("categoria", "La categoría es obligatoria"),
  positiveInt("tiempoMin", "El tiempo de preparación debe ser mayor a 0"),
  positiveInt("porciones", "Las porciones deben ser mayor a 0"),
  difficultyField(),
  ...ingredientesField({ optional: false }),
  ...stepsField({ optional: false }),
  body("tags").optional().isArray().withMessage("Los tags deben ser un arreglo"),
  body("imagenUrl").optional({ values: "falsy" }).trim().isURL().withMessage("imagenUrl debe ser una URL válida")
];

export const updateRecipeValidation = [
  textField("titulo", "El título no puede estar vacío", { optional: true }),
  textField("descripcion", "La descripción no puede estar vacía", { optional: true }),
  textField("categoria", "La categoría no puede estar vacía", { optional: true }),
  positiveInt("tiempoMin", "El tiempo de preparación debe ser mayor a 0", { optional: true }),
  positiveInt("porciones", "Las porciones deben ser mayor a 0", { optional: true }),
  difficultyField({ optional: true }),
  ...ingredientesField({ optional: true }),
  ...stepsField({ optional: true }),
  body("tags").optional().isArray().withMessage("Los tags deben ser un arreglo"),
  body("imagenUrl").optional({ values: "falsy" }).trim().isURL().withMessage("imagenUrl debe ser una URL válida")
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Datos de receta inválidos",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};
