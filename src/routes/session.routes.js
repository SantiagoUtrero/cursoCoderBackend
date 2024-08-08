import { Router } from "express";
import passport from "passport";
import sessionsController from "../controllers/sessions.controller.js";
import { authorization, passportCall } from "../middleware/passport.middleware.js";


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

export default router;