
import cartDao from "../dao/mongoDao/cart.dao.js"
import productDao from "../dao/mongoDao/product.dao.js";

const createCart = async (req,res) => {
   return await cartDao.create();
}
const addProductToCart = async (cid, pid) => {
    const product = await productDao.getById(pid);
    if (!product) return { product: false, cart: null };

    const cart = await cartDao.getById(cid);
    if (!cart) return { product: true, cart: false };

    
    const productInCart = cart.products.find(p => p.product.toString() === pid);
    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();

    return { product: true, cart: cart };
    
}
const getById = async (id) => {
    return await cartDao.getById(id)
}
const deleteProductInCart = async (cid, pid) => {
}

export default {
    createCart,
    addProductToCart,
    getById,
    deleteProductInCart
}