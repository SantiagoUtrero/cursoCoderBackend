import { body, validationResult } from "express-validator"

export const userLoginValidator = [

    body ("email")
    .isEmail().withMessage("el correo debe ser un email valido")
    .notEmpty().withMessage("el correo es obligatorio"),
    body ("password")
    .notEmpty().withMessage("la contra es obligatoria"),
    (req,res,next) => {
        const error = validationResult(req)
        if(!error.isEmpty()) {
            return res.status(400).json({status: "error", payload: error})
        }

        next();
    } 
]