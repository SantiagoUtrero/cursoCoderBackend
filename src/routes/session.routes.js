import { Router } from "express";
import passport from "passport";
import sessionsController from "../controllers/sessions.controller.js";
import { authorization, passportCall } from "../middleware/passport.middleware.js";
import { sendMail } from "../utils/sendMails.js";
import { generateUserMocks } from "../mocks/user.mock.js";
import { upload } from "../utils/uploadFiles.js";
import userController from "../controllers/user.controller.js";


const router = Router();

router.post("/register", passportCall("register"), sessionsController.register);

router.post("/login",passportCall("login"), sessionsController.login);

router.get ("/current", passportCall("jwt"), authorization("admin"), sessionsController.current)

router.get("/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
  session: false
  }),  
  sessionsController.loginGoogle
);

router.get("/logout", sessionsController.logout)

//despues crear los endpoints correspondientes

router.get("/email", async (req,res) => {

  const {name} = req.body;
  
  const template = `
    <div>
      <h1> Bienvenido ${name} a mi server </h1>
    </div>
    `;


  await sendMail("jubiladoveloz@gmail.com", "test nodemailer", "este es un mensaje de testeo", template)
  res.status(200).json({status: "ok", msg: "email enviado con exito"})
})

router.get("/usermocks", async (req, res) => {
  const users = generateUserMocks(5)
  res.status(200).json({status: "ok", users})
})

//upload multer
router.post ("/:uid/documents",
   passportCall("jwt"), 
   authorization("user", "admin"), 
   upload.fields([
    { name: "profile", maxCount: 1},
    {name: "productImg", maxCount: 1},
    {name: "documents", maxCount: 3}
      ]), userController.addDocuments
);
export default router;