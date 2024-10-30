import { Router } from "express";
import { passportCall, authorization } from "../middleware/passport.middleware.js";
import cartsController from "../controllers/carts.controller.js";
import { checkProductsAndCart } from "../middleware/checkProductAndCart.middleware.js";

const router = Router();

router.post("/", passportCall("jwt"), authorization("user"), cartsController.createCart );
router.get("/:cid", passportCall("jwt"), authorization("admin"), cartsController.getById)
router.post("/:cid/products/:pid", passportCall("jwt"), authorization("user"), checkProductsAndCart, cartsController.addProductToCart);
router.delete("/:cid/products/:pid", passportCall("jwt"), authorization("user"), checkProductsAndCart, cartsController.deleteProductInCart);
router.get("/:cid/purchase", passportCall("jwt"), authorization("user"), cartsController.purchaseCart);

export default router;
