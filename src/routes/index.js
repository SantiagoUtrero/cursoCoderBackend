import { Router } from "express";
import productsRoutes from "./products.routes.js"
import cartRoutes from "./cart.routes.js"
import viewsRoutes from "./views.routes.js";
import sessionRoutes from "./session.routes.js"

const router = Router();

router.use("/products", productsRoutes);
router.use("/carts", cartRoutes);
router.use("/views", viewsRoutes);
router.use ("/sessions", sessionRoutes)

export default router;
