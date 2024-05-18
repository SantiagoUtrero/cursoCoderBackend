import { Router } from "express";
import cartManager from "../dao/fsManagers/cartManager.js";

const router = Router();

router.post("/", async (req,res) => {
    try {
        const cart =  cartManager.createCart();
        res.status(201).json(cart)

    } catch (error) {
        console.error("Error creating cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
router.get("/:cid", async (req,res) => {
    try {
        const {cid} = req.params
        const cart = await cartManager.getCartById(cid)

        res.status(200).json(cart)
        
    } catch (error) {
        console.log(error)
    }
})
router.post("/:cid/products/:pid", async (req,res) => {
    try {
        const {cid, pid} = req.params
        const cart = await cartManager.addProductToCart(cid, pid)

        res.status(200).json(cart)
        
    } catch (error) {
        console.log(error)
    }
})

export default router;
