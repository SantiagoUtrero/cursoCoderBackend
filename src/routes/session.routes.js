import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";
import createHash, { isValidPassword } from "../utils/hasPassword.js";
import passport from "passport";
import { createToken, verifyToken } from "../utils/jwt.js";
import { authorization, passportCall } from "../middleware/passport.middleware.js";

const router = Router();

router.post("/register", passport.authenticate("register") ,async (req, res) => {
  try {
    res.status(201).json({status: "Success", msg: "User creation successfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({status: "Error", msg: "Internal server issue"})
  }
});

router.post("/login", passport.authenticate("login"), async (req, res) => {
  try {

    return res.status(200).json({status: "Success", payload: req.user})

  } catch (error) {
    console.log(error)
    res.status(500).json({status: "Error", msg: "Internal server issue"})
  }
});

router.post("/jwt", async (req, res) => {
  try {

    const {email, password } = req.body;

    const user = await userDao.getByEmail(email);
    if(!user || !isValidPassword(user, password)) return res.status(401).json ({status: "error", msg: "no valido" })

    const token = createToken(user);
    res.cookie("token", token, {httpOnly: true});

    return res.status(200).json({status: "Success", payload: user, token})

  } catch (error) {
    console.log(error)
    res.status(500).json({status: "Error", msg: "Internal server issue"})
  }
});

router.get ("/current", passportCall("jwt"), authorization("user") ,(req,res) => {
  try {
    
  

  return res.status(200).json({status: "Success", payload: req.user});

  } catch (error) {
    console.log(error)
    res.status(500).json({status: "Error", msg: "Internal server issue"})
  }
})


router.get("/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
  session: false
}), async (req, res) => {
  try {

    return res.status(200).json({status: "Success", payload: req.user})

  } catch (error) {
    console.log(error)
    res.status(500).json({status: "Error", msg: "Internal server issue"})
  }
});

router.get("/logout", async (req,res) => {
  try {
    req.session.destroy();
    return res.status(200).json({status: "Success", msg: "Logout successful"})
  } catch (error) {
    console.log(error)
    res.status(500).json({status: "Error", msg: "Internal server issue"})
  }
})

export default router;