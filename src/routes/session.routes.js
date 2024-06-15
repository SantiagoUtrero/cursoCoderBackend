import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";
import createHash, { isValidPassword } from "../utils/hasPassword.js";
import passport from "passport";

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