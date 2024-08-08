import { response, request } from "express";
import productsServices from "../services/products.services.js";
import cartsServices from "../services/carts.services.js";

export const checkProductsAndCart = async (req = request,res = response, next) => {
    const {cid, pid} = req.params;
    const product = await productsServices.getById(pid);
    const cart = await cartsServices.getById(cid);

    if (!product) return res.status(404).json({ status: "error", msg: `No se encontró el producto ${pid}` });
    if (!cart) return res.status(404).json({ status: "error", msg: `No se encontró el carrito ${cid}` });

    next();
}
