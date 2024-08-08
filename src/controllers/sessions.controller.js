import { createToken } from "../utils/jwt.js";

const register = async (req, res) => {
    try {
      res.status(201).json({status: "Success", msg: "User creation successfully"})
    } catch (error) {
      console.log(error)
      res.status(500).json({status: "Error", msg: "Internal server issue"})
    }
  };

  const login = async (req, res) => {
    try {
      const user = req.user;  // Asegúrate de que req.user esté siendo poblado correctamente por Passport
      const token = createToken(user);
      res.cookie("token", token, { httpOnly: true });
  
      return res.status(200).json({ status: "Success", payload: user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal server issue" });
    }
  };

const current = (req,res) => {
    try {
    return res.status(200).json({status: "Success", payload: req.user});
  
    } catch (error) {
      console.log(error)
      res.status(500).json({status: "Error", msg: "Internal server issue"})
    }
  }

const loginGoogle = async (req, res) => {
    try {
  
      return res.status(200).json({status: "Success", payload: req.user})
  
    } catch (error) {
      console.log(error)
      res.status(500).json({status: "Error", msg: "Internal server issue"})
    }
  };

const logout = async (req,res) => {
    try {
      req.session.destroy();
      return res.status(200).json({status: "Success", msg: "Logout successful"})
    } catch (error) {
      console.log(error)
      res.status(500).json({status: "Error", msg: "Internal server issue"})
    }
  };

export default {
    register,
    login,
    current,
    loginGoogle,
    logout
}