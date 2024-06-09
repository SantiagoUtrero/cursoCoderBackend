import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userDao.create(userData);
    if (!newUser) return res.status(400).json({status: "error ", msg: "no se pudo crear el usuario"}) 

    res.status(201).json({status: "Success", payload: newUser})
  } catch (error) {
    console.log(error)
    res.status(500).json({status: "Error", msg: "Internal server issue"})
  }
});

router.post("/login", async (req, res) => {
  try {
    const {email, password } = req.body;

    // si es admin
    

    if(email === "adminCoder@coder.com" && password === "adminCoder"){
      req.session.user = {
        email,
        role: "admin"
      }
     return res.status(200).json({status: "Success", payload: req.session.user})
    }
    // si no es admin

    const user = await userDao.getByEmail(email);
    if(!user || user.password !==  password){
      return res.status(401).json({status: "error ", msg: "Email o password incorrectos"});
    }

    req.session.user ={
      email,
      role: user
    }

    return res.status(200).json({status: "Success", payload: req.session.user})

  } catch (error) {
    console.log(error)
    res.status(500).json({status: "Error", msg: "Internal server issue"})
  }
});


export default router;