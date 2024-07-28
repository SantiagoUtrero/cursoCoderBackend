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

const update = (query,data) => {
  return cartModel.findOneAndUpdate(query, data)
}

const deleteProductInCart = async (cid, pid) => {

    const product = await productModel.findById(pid);
    if (!product) return { product: false};

    const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid}, { $inc: { "products.$.quantity": -1}});
    if (!cart) return { cart: false};
    const cartUpdate = await cartModel.findById(cid)
    return cartUpdate
};
export default {
    getById,
    create,
    update,
    deleteProductInCart}