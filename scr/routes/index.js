import { Router } from "express";
import productsRoutes from "./products.routes.js"
import cartRoutes from "./cart.routes.js"

const router = Router();

router.use("/products", productsRoutes);
router.use("/carts", cartRoutes);

export default router;