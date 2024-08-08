import { cartModel } from "../mongo/models/cart.model.js";


const getById = async (id) =>{
    const cart = await cartModel.findById(id);
    return cart;
}

const create = async (data) =>{
    const cart = await cartModel.create(data);
    return cart;
}

const addProductToCart = async (cid, pid) => {

    await checkProductsAndCart(cid,pid);

    const productInCart = cart.products.find(p => p.product.toString() === pid);
    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();

    return { product: true, cart: cart };
    
}

const deleteProductInCart = async (cid, pid) => {
    const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid}, { $inc: { "products.$.quantity": -1}, new: true});
    return cart;
};

export default {
    deleteProductInCart,
    addProductToCart,
    create,
    getById
}