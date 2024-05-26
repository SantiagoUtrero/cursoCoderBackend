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

        
        const productInCart = cart.products.find(p => p.product.toString() === pid);
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();

        return { product: true, cart: cart };
    } catch (error) {
        console.error("Error agregando producto al carrito:", error);
        throw error;
    }
};

const deleteProductInCart = async (cid, pid) => {
    try {
        const product = await productModel.findById(pid);
        if (!product) return { product: false, cart: null };

        const cart = await cartModel.findById(cid);
        if (!cart) return { product: true, cart: false };

        const productInCart = cart.products.find(p => p.product.toString() === pid);
        if (productInCart) {
            productInCart.quantity -= 1;
            if (productInCart.quantity <= 0) {
                cart.products = cart.products.filter(p => p.product.toString() !== pid);
            }
            await cart.save();
            return { product: true, cart: cart };
        } else {
            return { product: false, cart: true };
        }
    } catch (error) {
        console.error("Error eliminando producto del carrito:", error);
        throw error;
    }
};
export default {
    getById,
    create,
    addProductToCart,
    deleteProductInCart}