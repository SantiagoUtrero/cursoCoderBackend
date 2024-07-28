import { Router } from "express";
import { passportCall, authorization } from "../middleware/passport.middleware.js";
import cartsController from "../controllers/carts.controller.js";

const router = Router();

router.post("/", passportCall("jwt"), authorization("admin"), cartsController.createCart );
router.get("/:cid", passportCall("jwt"), authorization("admin"), cartsController.getById)
router.post("/:cid/products/:pid", passportCall("jwt"), authorization("admin"), cartsController.addProductToCart);
router.delete("/:cid/products/:pid", passportCall("jwt"), authorization("admin"), cartsController.deleteProductInCart);

export default router;
