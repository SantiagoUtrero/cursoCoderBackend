
import cartsServices from "../services/carts.services.js";

const createCart = async (req,res) => {
    try {
        const cart =  cartsServices.createCart();
        res.status(201).json({status: "success", payload: cart})

    } catch (error) {
        console.error("Error creating cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await cartsServices.addProductToCart(cid, pid);

        if (!result.product) return res.status(404).json({ status: "error", msg: `No se encontró el producto ${pid}` });
        if (!result.cart) return res.status(404).json({ status: "error", msg: `No se encontró el carrito ${cid}` });

        res.status(200).json({ status: "success", payload: result.cart });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
}
const getById = async (req,res) => {
    try {
        const {cid} = req.params
        const cart = await cartsServices.getById(cid)
        res.status(200).json({status: "success", payload: cart})
        
    } catch (error) {
        console.log(error)
    }
}
const deleteProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await cartsServices.deleteProductInCart(cid, pid);

        res.status(200).json({ status: "success", payload: result.cart });
    } catch (error) {
        console.error("Error deleting product from cart:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
}
const purchaseCart = async (req, res) => {
  try {

    //TODO llamar al servicio de compra 

  } catch (error) {
    console.error("Error deleting product from cart:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
}
}


export default {
    createCart,
    addProductToCart,
    getById,
    deleteProductInCart,
    purchaseCart
}