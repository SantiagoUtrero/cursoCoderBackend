import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

const getById = async (id) =>{
    const cart = await cartModel.findById(id);
    return cart;
}

const create = async (data) =>{
    const cart = await cartModel.create(data);
    return cart;
}

const addProductToCart = async (cid, pid) => {
    try {
        const product = await productModel.findById(pid);
        if (!product) return { product: false, cart: null };

        const cart = await cartModel.findById(cid);
        if (!cart) return { product: true, cart: false };

        cart.products.push(product);
        await cart.save();

        return { product: true, cart: cart };
    } catch (error) {
        console.error("Error agregando producto al carrito:", error);
        throw error;
    }
};

export default {
    getById,
    create,
    addProductToCart}