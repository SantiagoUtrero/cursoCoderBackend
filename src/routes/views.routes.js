import { Router } from "express";


const router = Router();

router.get("/home", (req,res)=>{
    let person = {
        name: "pepe",
        lastName: "guzman"
    };

    res.render("home", person);
});

export default router;