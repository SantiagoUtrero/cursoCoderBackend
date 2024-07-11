import { body, validationResult } from "express-validator"

export const userLoginValidator = [

    body ("email")
    .isEmail().withMessage("el correo debe ser un email valido")
    .notEmpty().withMessage("el correo es obligatorio"),
    body ("password")
    .notEmpty().withMessage("la contra es obligatoria"),
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