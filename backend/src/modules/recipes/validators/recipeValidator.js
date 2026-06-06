import {
  body,
  validationResult
} from "express-validator";

const allowedDifficulties = [
  "facil",
  "media",
  "dificil"
];

// Allows arrays or comma-separated text for ingredients, steps, and tags.
const normalizeTextArray = (value) => {
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (!Array.isArray(value)) {
    return value;
  }

  return value
    .map((item) =>
      typeof item === "string" ? item.trim() : item
    )
    .filter(Boolean);
};

const validateTextArray = (
  fieldName,
  { optional = true } = {}
) => {
  const validator = body(fieldName);

  if (optional) {
    validator.optional();
  }

  return validator
    .customSanitizer(normalizeTextArray)
    .isArray({
      min: 1
    })
    .withMessage(`${fieldName} debe tener al menos un elemento`)
    .bail()
    .custom((items) =>
      items.every(
        (item) =>
          typeof item === "string" &&
          item.trim().length > 0
      )
    )
    .withMessage(`${fieldName} solo acepta textos`);
};

const textField = (
  fieldName,
  message,
  { optional = false } = {}
) => {
  const validator = body(fieldName);

  if (optional) {
    validator.optional();
  }

  return validator
    .trim()
    .notEmpty()
    .withMessage(message);
};

const difficultyField = ({
  optional = false
} = {}) => {
  const validator =
    body("dificultad");

  if (optional) {
    validator.optional();
  }

  return validator
    .trim()
    .toLowerCase()
    .isIn(allowedDifficulties)
    .withMessage(
      "La dificultad debe ser facil, media o dificil"
    );
};

const optionalTrimmedField = (fieldName) =>
  body(fieldName)
    .optional()
    .trim();

const optionalUrlField = (fieldName) =>
  body("imagen")
    .optional({
      values: "falsy"
    })
    .trim()
    .isURL()
    .withMessage(`${fieldName} debe ser una URL valida`);

// Validates all required fields when creating a recipe.
export const createRecipeValidation = [
  textField("titulo", "El titulo es obligatorio"),
  optionalTrimmedField("descripcion"),
  textField("categoria", "La categoria es obligatoria"),
  difficultyField(),
  validateTextArray("ingredientes", {
    optional: false
  }),
  validateTextArray("pasos"),
  validateTextArray("tags"),
  optionalTrimmedField("instrucciones"),
  optionalUrlField("imagen"),

  body()
    .custom((value) => {
      const hasInstructions =
        typeof value.instrucciones === "string" &&
        value.instrucciones.trim().length > 0;

      const hasSteps =
        Array.isArray(value.pasos) &&
        value.pasos.length > 0;

      if (!hasInstructions && !hasSteps) {
        throw new Error(
          "Debe agregar instrucciones o pasos"
        );
      }

      return true;
    })
];

// Validates only the fields that are sent when editing a recipe.
export const updateRecipeValidation = [
  textField("titulo", "El titulo no puede estar vacio", {
    optional: true
  }),
  optionalTrimmedField("descripcion"),
  textField("categoria", "La categoria no puede estar vacia", {
    optional: true
  }),
  difficultyField({
    optional: true
  }),
  validateTextArray("ingredientes"),
  validateTextArray("pasos"),
  validateTextArray("tags"),
  optionalTrimmedField("instrucciones"),
  optionalUrlField("imagen"),

  body()
    .custom((value) => {
      const isClearingInstructions =
        Object.prototype.hasOwnProperty.call(
          value,
          "instrucciones"
        ) &&
        typeof value.instrucciones === "string" &&
        value.instrucciones.trim().length === 0;

      const isClearingSteps =
        Object.prototype.hasOwnProperty.call(
          value,
          "pasos"
        ) &&
        Array.isArray(value.pasos) &&
        value.pasos.length === 0;

      if (isClearingInstructions && isClearingSteps) {
        throw new Error(
          "Debe conservar instrucciones o pasos"
        );
      }

      return true;
    })
];

// Returns validation errors in a consistent API response.
export const handleValidationErrors = (
  req,
  res,
  next
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Datos de receta invalidos",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg
      }))
    });
  }

  next();
};
