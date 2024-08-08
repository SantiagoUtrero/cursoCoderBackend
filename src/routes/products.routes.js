import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import { authorization, passportCall } from "../middleware/passport.middleware.js";
import { productDataValidator } from "../validators/productData.validator.js";

const router = Router();


router.get("/", productsController.getAll );

router.post("/", passportCall("jwt"), authorization("admin"), productDataValidator, productsController.create);
router.get("/:pid", productsController.readOne);
router.put("/:pid", passportCall("jwt"), authorization("admin"), productsController.update);
router.delete("/:pid", passportCall("jwt"), authorization("admin"), productsController.destroy);

export default router;