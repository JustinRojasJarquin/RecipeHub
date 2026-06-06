import { body, validationResult } from "express-validator";

export const createCommentValidation = [
  body("texto")
    .trim()
    .notEmpty()
    .withMessage("El texto del comentario es obligatorio"),

  body("calificacion")
    .isInt({ min: 1, max: 5 })
    .withMessage("La calificacion debe ser un numero entre 1 y 5")
];

export const handleCommentValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Datos de comentario invalidos",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg
      }))
    });
  }

  next();
};
