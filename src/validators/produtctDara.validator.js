import { body, validationResult } from "express-validator";

export const productDataValidator = [
body("tittle")
    .isString().withMessage("el titulo tiene que ser un texto")
    .isEmpty().withMessage("el titulo es obligatorio")
    .isLength({min: 3}).withMessage("tiene que tener por lo menos 3 caracteres"),
body("description")
    .isString().withMessage("la descripcion tiene que ser un texto")
    .isEmpty().withMessage("la descripcion es obligatoria"),
body("thumbnail")
    .isArray().withMessage("tiene que ser un array"),
body("code")
    .isString().withMessage("el codigo tiene que ser un texto")
    .isEmpty().withMessage("el codigo es obligatorio")
    .isLength({min: 3}).withMessage("tiene que tener por lo menos 3 caracteres"),
body("stock")
    .isNumeric().withMessage("tiene que ser un valor numerico")
    .isLength({min: 1}).withMessage("tiene que tener al menos 1 caracter")
    .isEmpty().withMessage("stock obligatorio"),
body("status")
    .isBoolean(),
body("price")
    .isNumeric().withMessage("tiene que ser un valor numerico")
    .isLength({min: 1}).withMessage("tiene que tener al menos 1 caracter")
    .isEmpty().withMessage("precio obligatorio"),
body("tittle")
    .isString().withMessage("la categoria tiene que ser un texto")
    .isEmpty().withMessage("la categoria es obligatoria")
    .isLength({min: 3}).withMessage("tiene que tener por lo menos 3 caracteres"),
    
    (req,res,next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const formatErrors = errors.array().map(e => {
                return {msg: e.msg, data: e.path}
            })
            return res.status(400).json({status: "error", errors: formatErrors})
        }

        next();
    } 
    
]
  

