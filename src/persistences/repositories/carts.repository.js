import { cartModel } from "../mongo/models/cart.model.js";
import { checkProductsAndCart } from "../../middleware/checkProductAndCart.middleware.js";


const getById = async (id) =>{
    const cart = await cartModel.findById(id);
    return cart;
}

const create = async (data) =>{
    const cart = await cartModel.create(data);
    return cart;
}

const addProductToCart = async (cid, pid) => {
    
    const productInCart = await cartModel.findOneAndUpdate(
        { _id: cid, "products.product": pid },
        { $inc: { "products.$.quantity": 1 } },
        { new: true }
      );
    
      if (!productInCart) {
        return await cartModel.findOneAndUpdate({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } }, { new: true });
      }
    
      return productInCart;
};
const updateCart = async (cid, products) => {
    const cart = await cartModel.findByIdAndUpdate(cid, { $set: { products } }, { new: true });
    return cart;
  };

const deleteProductInCart = async (cid, pid) => {
    const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid}, { $inc: { "products.$.quantity": -1}, new: true});
    return cart;
};

export default {
    deleteProductInCart,
    addProductToCart,
    create,
    getById,
    updateCart
}