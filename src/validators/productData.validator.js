import { body, validationResult } from "express-validator";

export const productDataValidator = [
  body("title")
    .notEmpty().withMessage("el titulo es obligatorio")
    .bail() // Detiene la validación si está vacío
    .isString().withMessage("el titulo tiene que ser un texto")
    .isLength({ min: 3 }).withMessage("tiene que tener por lo menos 3 caracteres"),
  
  body("description")
    .notEmpty().withMessage("la descripcion es obligatoria")
    .bail()
    .isString().withMessage("la descripcion tiene que ser un texto"),
  
  body("thumbnail")
    .optional() // No es obligatorio
    .isArray().withMessage("tiene que ser un array"),
  
  body("code")
    .notEmpty().withMessage("el codigo es obligatorio")
    .bail()
    .isString().withMessage("el codigo tiene que ser un texto")
    .isLength({ min: 3 }).withMessage("tiene que tener por lo menos 3 caracteres"),
  
  body("stock")
    .notEmpty().withMessage("stock obligatorio")
    .bail()
    .isNumeric().withMessage("tiene que ser un valor numerico"),
  
  body("status")
    .isBoolean().withMessage("el status tiene que ser un valor booleano"),
  
  body("price")
    .notEmpty().withMessage("precio obligatorio")
    .bail()
    .isNumeric().withMessage("tiene que ser un valor numerico"),
  
  body("category")
    .notEmpty().withMessage("la categoria es obligatoria")
    .bail()
    .isString().withMessage("la categoria tiene que ser un texto")
    .isLength({ min: 3 }).withMessage("tiene que tener por lo menos 3 caracteres"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formatErrors = errors.array().map(e => {
        return { msg: e.msg, data: e.param };
      });
      return res.status(400).json({ status: "error", errors: formatErrors });
    }

    next();
  }
];